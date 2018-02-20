import Entry from '../models/entry';

/**
 * Fetch tims entries
 */
export const fetchEntries = (req, res, next) => {
  Entry.find({}, (err, entries) => {
    if (err) { return next(err); }

    if (entries === undefined) {
      return res.status(422).send({ error: "no entries found" });
    }

    res.json(entries);
  });
};

/**
 * Make an entry
 */
export const makeEntry = (req, res, next) => {
  const { firstname, lastname, email, date, size, win, prize, comment } = req.body;

  if (!firstname || !lastname || !email || !date || !size || !win) {
    return res.status(422).send({ error: "all fields are required" });
  }

  Entry.find({}, (err, entries) => {
    if (err) { return next(err); }

    let id = 0;
    if (entries !== undefined) {
      id = entries.length;
    }

    const entry = new Entry({ id, firstname, lastname, email, date, size, win, prize, comment });

    entry.save((err) => {
      if (err) { return next(err); }

      res.json({ id });
    });
  });
};
