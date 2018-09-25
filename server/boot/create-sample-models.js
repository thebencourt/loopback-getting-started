const async = require('async');
module.exports = (app) => {
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops),
  }, (err, { reviewers, coffeeShops }) => {
    if (err) {
      throw err;
    }

    createReviews(reviewers, coffeeShops, (err) => {
      console.log('> models created successfully');
    });
  });

  function createReviewers(cb) {
    app.dataSources.db.automigrate('Reviewer', (err) => {
      if (err) {
        return cb(err);
      }

      const Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }

  function createCoffeeShops(cb) {
    app.dataSources.db.automigrate('CoffeeShop', (err) => {
      if (err) {
        return cb(err);
      }

      const CoffeeShop = app.models.CoffeeShop;
      CoffeeShop.create([{
        name: 'Starbucks',
        city: 'Swansea'
      }, {
        name: 'Costa',
        city: 'Cardiff'
      }, {
        name: 'Cafe Nero',
        city: 'Cardiff'
      }], cb);
    });
  }

  function createReviews(reviewers, coffeeShops, cb) {
    app.dataSources.db.automigrate('Review', (err) => {
      if (err) {
        return cb(err);
      }

      const Review = app.models.Review;
      const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 14;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'Very good',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[0].id
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 4,
        comments: 'Pretty good',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[0].id
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 3,
        comments: 'OK',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[1].id
      }, {
        date: Date.now() - DAY_IN_MILLISECONDS,
        rating: 1,
        comments: 'Wouldn\'t go back',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[1].id
      }], cb);
    });
  }
};
