import Entry from "../models/entry";

/**
 * Fetch tims entries
 */
export const fetchEntries = (req, res, next) => {
  Entry.find({}, (err, entries) => {
    if (err) {
      return next(err);
    }

    if (entries === undefined) {
      return res.status(422).send({ error: "no entries found" });
    }

    res.json(entries);
  });
};

/**
 * Fetch a users tims entries
 */
export const fetchUserEntries = (req, res, next) => {
  Entry.find({ email: req.user.email }, (err, entries) => {
    if (err) {
      return next(err);
    }

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
  const {
    firstname,
    lastname,
    email,
    date,
    size,
    purchased,
    win,
    prize,
    appPrize,
    comment
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !date ||
    !size ||
    !win ||
    !purchased
  ) {
    return res.status(422).send({ error: "all fields are required" });
  }

  const entry = new Entry({
    firstname,
    lastname,
    email,
    date,
    size,
    purchased,
    win,
    prize,
    appPrize,
    comment
  });

  entry.save(err => {
    if (err) {
      return next(err);
    }

    res.json({ message: "success" });
  });
};

import csv from "csv-parser";
import fs from "fs";

/**
 * Make CSV entry
 */
export const makeEntryCsv = (req, res, next) => {
  const { firstname, lastname, email } = req.user;
  fs
    .createReadStream(req.file.path)
    .pipe(csv())
    .on("data", function(data) {
      console.log(data);
      const { date, size, purchased, win, prize, appPrize, comment } = data;
      console.log(date);
      console.log(size);
      console.log(purchased);
      console.log(win);
      console.log(prize);
      console.log(appPrize);
      console.log(comment);
      if (
        !firstname ||
        !lastname ||
        !email ||
        !date ||
        !size ||
        !win ||
        !purchased
      ) {
        return res.status(422).send({ error: "all fields are required" });
      }

      const entry = new Entry({
        firstname,
        lastname,
        email,
        date,
        size,
        purchased,
        win,
        prize,
        appPrize,
        comment
      });

      entry.save(err => {
        if (err) {
          return next(err);
        }
      });
    });

  res.json({ message: "success" });
};
