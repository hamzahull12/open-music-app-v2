const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postLoginUserHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putRefreshTokenHandler,
  },
];

module.exports = routes;
