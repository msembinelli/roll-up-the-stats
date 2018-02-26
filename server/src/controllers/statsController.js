import Entry from "../models/entry";
import User from "../models/user";

function mostWinsHelper() {
  return Entry.aggregate([
    {
      $match: {
        win: "Yes"
      }
    },
    {
      $group: {
        _id: {
          firstname: "$firstname",
          lastname: "$lastname"
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: 1
    }
  ]);
}

function mostPurchasesHelper() {
  return Entry.aggregate([
    {
      $match: {
        purchased: "Yes"
      }
    },
    {
      $group: {
        _id: {
          firstname: "$firstname",
          lastname: "$lastname"
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: 1
    }
  ]);
}

function mostEntriesOneDayHelper(email) {
  return Entry.aggregate([
    {
      $match: {
        email: email
      }
    },
    {
      $project: {
        maxDate: {
          $dateToString: {
            format: "%m/%d/%Y",
            date: "$date",
            timezone: "America/Edmonton"
          }
        }
      }
    },
    {
      $group: {
        _id: {
          maxDate: "$maxDate"
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit: 1
    }
  ]);
}

function winningSizesFinalize(sizeWins) {
  const mostWins = sizeWins.reduce(
    (max, p) => (p.wins > max ? p.wins : max),
    sizeWins[0].wins
  );

  let winningSizesList = [];
  sizeWins.filter(entry => {
    if (entry.wins === mostWins) {
      winningSizesList.push(entry);
    }
  });

  return winningSizesList;
}

function countEntries(fieldsToMatch) {
  return Entry.count(fieldsToMatch, (err, count) => {
    if (err) {
      return next(err);
    }
  });
}

/**
 * Fetch stats
 */
export const fetchStats = (req, res, next) => {
  Promise.all([
    countEntries({}),
    countEntries({ win: "Yes" }),
    countEntries({ size: "S", win: "Yes" }),
    countEntries({ size: "M", win: "Yes" }),
    countEntries({ size: "L", win: "Yes" }),
    countEntries({ size: "XL", win: "Yes" }),
    countEntries({ size: "S", purchased: "Yes" }),
    countEntries({ size: "M", purchased: "Yes" }),
    countEntries({ size: "L", purchased: "Yes" }),
    countEntries({ size: "XL", purchased: "Yes" }),
    mostPurchasesHelper(),
    mostWinsHelper()
  ]).then(results => {
    const [
      numEntries,
      numWins,
      smallWins,
      mediumWins,
      largeWins,
      xLargeWins,
      smallPurchased,
      mediumPurchased,
      largePurchased,
      xLargePurchased,
      mostPurchasesResults,
      mostWinsResults
    ] = results;

    const sizeWins = [
      { size: "S", wins: smallWins },
      { size: "M", wins: mediumWins },
      { size: "L", wins: largeWins },
      { size: "XL", wins: xLargeWins }
    ];

    const sizeTotalSpent =
      smallPurchased * 1.56 +
      mediumPurchased * 1.77 +
      largePurchased * 1.98 +
      xLargePurchased * 2.19;

    const statsResponse = {
      totalWins: numWins,
      winRate: {
        value: numWins / numEntries,
        fractionString: `${numWins} / ${numEntries}`
      },
      winningSizes: winningSizesFinalize(sizeWins),
      mostPurchases: mostPurchasesResults,
      mostWins: mostWinsResults,
      dollarsSpent: sizeTotalSpent
    };
    res.json(statsResponse);
  });
};

/**
 * Fetch user stats
 */
export const fetchUserStats = (req, res, next) => {
  Promise.all([
    countEntries({ email: req.user.email }),
    countEntries({ email: req.user.email, win: "Yes" }),
    countEntries({ email: req.user.email, size: "S" }),
    countEntries({ email: req.user.email, size: "M" }),
    countEntries({ email: req.user.email, size: "L" }),
    countEntries({ email: req.user.email, size: "XL" }),
    countEntries({ email: req.user.email, size: "S", purchased: "Yes" }),
    countEntries({ email: req.user.email, size: "M", purchased: "Yes" }),
    countEntries({ email: req.user.email, size: "L", purchased: "Yes" }),
    countEntries({ email: req.user.email, size: "XL", purchased: "Yes" }),
    countEntries({
      email: req.user.email,
      date: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }
    }),
    mostEntriesOneDayHelper(req.user.email)
  ]).then(results => {
    const [
      numEntries,
      numWins,
      smallTotal,
      mediumTotal,
      largeTotal,
      xLargeTotal,
      smallPurchased,
      mediumPurchased,
      largePurchased,
      xLargePurchased,
      entriesPastWeek,
      mostEntriesOneDay
    ] = results;

    const sizeTotalSpent =
      smallPurchased * 1.56 +
      mediumPurchased * 1.77 +
      largePurchased * 1.98 +
      xLargePurchased * 2.19;

    const litresConsumed =
      smallTotal * 0.286 +
      mediumTotal * 0.425 +
      largeTotal * 0.563 +
      xLargeTotal * 0.678;

    const statsResponse = {
      totalWins: numWins,
      winRate: {
        value: numWins / numEntries ? numWins / numEntries : 0,
        fractionString: `${numWins} / ${numEntries}`
      },
      entriesPastWeek: entriesPastWeek,
      mostEntriesOneDay: mostEntriesOneDay,
      litresConsumed: litresConsumed,
      dollarsSpent: sizeTotalSpent
    };
    res.json(statsResponse);
  });
};
