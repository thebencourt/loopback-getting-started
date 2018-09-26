'use strict';

module.exports = (Review) => {
  Review.beforeRemote('create', ({ args, req }, user, next) => {
    args.data.date = Date.now();
    args.data.publisherId = req.accessToken.userId;
    next();
  });
};
