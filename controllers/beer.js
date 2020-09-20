const express = require("express");
const router = express.Router();

const db = require("../models");
// base route is /beers

// index
router.get("/", function (req, res) {
  db.Beer.find({}, function (error, foundBeers) {
    if (error) return res.send(error);

    const context = {
      beers: foundBeers,
    };
    res.render("beer/index", context);
  });
});

// new
router.get("/new", function (req, res) {
  db.Beer.find({}, function (error, foundBeers) {
    if (error) return res.send(error);

    const context = {
      beers: foundBeers,
    };

    res.render("beer/new", context);
  });
});

// create
router.post("/", function (req, res) {
  console.log(req.body);
  db.Beer.create(req.body, function (error, createdBeer) {
    if (error) {
      console.log(error);
      return res.send(error);
    }
    db.Brewery.findById(req.body.brewery, function (error, foundBrewery) {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      foundBrewery.beers.push(createdBeer);
      foundBrewery.save;

      res.send("This worked");
      res.redirect("/beers");
    });
  });
});

// show
router.get(":/id", function (req, res) {
  db.Beer.findById(req.params.id),
    function (error, foundBeer) {
      if (error) {
        console.log(error);
        return res.send(error);
      }
      const context = { beer: foundBeer };
      res.render("beer/show", context);
    };
});

// edit
router.get("/:id/edit", function (req, res) {
  db.Beer.findById(req.params.id, function (error, foundBeer) {
    if (error) {
      console.log(error);
      return res.send(error);
    }
    const context = { beer: foundBeer };
    res.render("beer/edit", context);
  });
});

// update

// delete

module.exports = router;
