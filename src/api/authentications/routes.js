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
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.logoutDeleteUserHandler,
  },
];

module.exports = routes;
