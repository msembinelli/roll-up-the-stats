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
      winRate: numWins / numEntries,
      winningSizes: winningSizesFinalize(sizeWins),
      mostPurchases: mostPurchasesResults,
      mostWins: mostWinsResults,
      dollarsSpent: sizeTotalSpent
    };
    res.json(statsResponse);
  });
};
