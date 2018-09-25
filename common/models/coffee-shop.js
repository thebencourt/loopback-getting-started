'use strict';

module.exports = (CoffeeShop) => {
  CoffeeShop.status = (cb) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const OPEN_HOUR = 6;
    const CLOSE_HOUR = 20;
    const isOpen = currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR;
    const openMsg = 'We are open for business.'
    const closedMsg = `Sorry, we are closed. Open daily from ${OPEN_HOUR}am to ${CLOSE_HOUR}pm.`;
    cb(null, isOpen ? openMsg : closedMsg);
  };

  CoffeeShop.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );
};
