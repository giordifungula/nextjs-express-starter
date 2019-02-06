const routers = [
  {
    pattern: '/list/:id/edit',
    controller: editList = (req, res, app) => {
      return app.render(req, res, '/list/edit', { id: req.params.id });
    }
  },
  {
    pattern: '/list/:id',
    controller: viewList = (req, res, app) => {
      return app.render(req, res, '/list', { id: req.params.id });
    }
  },
  {
    pattern: '/@:id/edit',
    controller: viewProfile = (req, res, app) => {
      const params = { id: req.params.id }
      return app.render(req, res, '/profile/edit', params);
    }
  },
  {
    pattern: '/@:id',
    controller: viewProfile = (req, res, app) => {
      const params = { id: req.params.id }
      return app.render(req, res, '/profile', params);
    }
  },
];

module.exports = routers;
