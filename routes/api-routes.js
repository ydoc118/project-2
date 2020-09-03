/* eslint-disable camelcase */
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const apiHelper = require("./api-helper");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/voter_validation/:dLicense/:voterReg/:zip", (req, res) => {
    db.Voter_id.findOne({
      where: {
        d_license: req.params.dLicense,
        registration_id: req.params.voterReg,
        zip: req.params.zip
        // req.params.zip
        // req.body.zipCode
        // '19114'
      }
    }).then(results => {
      const registered = results ? true : false;
      //console.log(results);
      let hbsObject = {};
      if (registered && results.dataValues.first_name) {
        hbsObject = results.dataValues;
      }
      hbsObject.registered = registered;
      //console.log(hbsObject);
      // res.redirect("/index")
      res.render("index", hbsObject);
    });
  });

  app.put("/api/update_email_voterids/:voterReg/:email", (req, res) => {
    //console.log(req.body);
    db.Voter_id.update(
      {
        registered: 1,
        user_id: req.params.email
      },
      {
        where: {
          registration_id: req.params.voterReg
        }
      }
    ).then(results => {
      res.json(results);
      //console.log(results);
    });
  });

  app.get("/api/voter_address/:id", (req, res) => {
    console.log("req.params.id: " + req.params.id);
    db.Voter_id.findOne({
      where: {
        id: req.params.id
      }
    }).then(results => {
      //console.log(results);
      //const voterAddress = results.dataValues;
      //console.log(voterAddress);
      res.json(results.dataValues);
    });
  });

  app.get("/getAPIResponse/:street/:city/:state/:zip", (req, res) => {
    const apiBallotKey = "AIzaSyDEUd0JEmtWQxPN_qDgJ8MndQ5koW3HXho";
    // eventually this will be replaced with a get call to https://www.googleapis.com/civicinfo/v2/elections?key=${apiBallotKey} and will get the appropriate ballots based on the ballot call from the address of the voter
    const ballotId = "2000";
    const street = req.params.street;
    const city = req.params.city;
    const state = req.params.state;
    const zip = req.params.zip;
    apiHelper
      .makeApiCall(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiBallotKey}&address=${street}%20${city}%20${state}%20${zip}&electionId=${ballotId}`
      )
      .then(response => {
        let ballotObject = {};
        //ballotObject = response.contests;
        ballotObject = response;
        console.log(response.contests);
        res.render("ballot", ballotObject);
        //res.json(ballotObject);
      })
      .catch(error => {
        res.send(error);
      });
  });
};
