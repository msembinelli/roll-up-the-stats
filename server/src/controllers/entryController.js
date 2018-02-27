import Entry from "../models/entry";
import csv from "csv-parser";
import fs from "fs";
import {
  sizesList,
  purchasedList,
  winsList,
  prizesList,
  appPrizesList
} from "./types/index";

/**
 * Fetch tims entries
 */
export const fetchEntries = (req, res, next) => {
  Entry.find({}, (err, entries) => {
    if (err) {
      return next(err);
    }

    if (entries === undefined) {
      return res.status(422).send({ error: "No entries found" });
    }

    res.json(entries);
  }).sort({ date: 1 });
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
      return res.status(422).send({ error: "No entries found" });
    }

    res.json(entries);
  }).sort({ date: 1 });
};

/**
 * Make an entry
 */
export const makeEntry = (req, res, next) => {
  const { firstname, lastname, email } = req.user;
  const { date, size, purchased, win, prize, appPrize, comment } = req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !date ||
    !size ||
    !win ||
    !purchased
  ) {
    return res.status(422).send({ error: "All fields are required" });
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

/**
 * Make CSV entry
 */
export const makeEntryCsv = (req, res, next) => {
  const { firstname, lastname, email } = req.user;
  var stream = fs.createReadStream(req.file.path);
  stream.pipe(csv()).on("data", function(data) {
    const { date, size, purchased, win, prize, appPrize, comment } = data;
    if (
      firstname &&
      lastname &&
      email &&
      date &&
      size &&
      sizesList.indexOf(size) > -1 &&
      win &&
      winsList.indexOf(win) > -1 &&
      purchased &&
      purchasedList.indexOf(purchased) > -1
    ) {
      if (win === "Yes" && (!prize && !appPrize)) {
        console.log("win but no prize " + prize + " " + appPrize);
      }

      if (
        (win && (prize && prizesList.indexOf(prize) == -1)) ||
        (appPrize && appPrizesList.indexOf(appPrize) == -1)
      ) {
        console.log("invalid prize " + prize + " " + appPrize);
      }

      const entry = new Entry({
        firstname: firstname,
        lastname: lastname,
        email: email,
        date: date,
        size: size,
        purchased: purchased,
        win: win,
        prize: prize,
        appPrize: appPrize,
        comment: comment
      });

      entry.save(err => {
        if (err) {
          return next(err);
        }
      });
    }
  });

  res.json({ message: "success" });
};
