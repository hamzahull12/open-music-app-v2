const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.PostLoginUserHandler,
  },
];

module.exports = routes;
