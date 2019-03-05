const async = require('async');
const Guest = require('../models/guest');
const stdError = new Error('An error has occurred.');
const mongoose = require('mongoose');

exports.getGuests = (req, res, next) => {
  Guest.find({ userId: req.userData.userId })
  .then(results => {
    if (!results) {
      next(stdError);
    }
    res.status(200).json({
      guests: results
    });
  });
}

exports.addGuests = (req, res, next) => {
  console.log('Calling addGuests');
  async.waterfall([async.apply(removeAllGuestsForUser, req), tackOnUserToGuests, insertGuestsIntoDb],
  (err, results) => {
    if (err) {
      console.log(err);
      next(stdError);
    } else {
      console.log('addGuests succeeded!');
      console.log(results);
      res.status(201).json({
        guestsAdded: results
      });
    }
  });
}

function removeAllGuestsForUser(req, callback) {
  console.log('calling removeAllGuestsForUser');
  const uid = req.userData.userId;
  const query = { userId: uid.toString() };
  Guest.deleteMany(query, (err, results) => {
    if (err) {
      callback(err);
    }
    console.log(results);
    callback(null, req);
  });
}

function tackOnUserToGuests(req, callback) {
  const guests = req.body;
  if (!guests || guests.length === 0) {
    callback(stdError);
  }
  for (let i = 0; i < guests.length; i++) {
    guests[i].userId = mongoose.Types.ObjectId(req.userData.userId);
    if (i === guests.length - 1) {
      callback(null, req)
    }
  }
}

function insertGuestsIntoDb(req, callback) {
  Guest.collection.insert(req.body, (err, results) => {
    if (err) {
      next(stdError);
    }
    const tfdGuests = results.ops.map(t => {
      return {firstName: t.firstName, lastName: t.lastName, isPlusOne: t.isPlusOne, isAttending: false, canSeeHotel: t.canSeeHotel, hasRSVPd: false}
    });
    callback(null, tfdGuests);
  });
}
