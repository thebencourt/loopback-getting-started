'use strict';

module.exports = app => {
  app.get('/status', app.loopback.status());
};
