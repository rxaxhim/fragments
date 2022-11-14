// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */
// import response
const createSuccessResponse = require('../../response').createSuccessResponse;
const createErrorResponse = require('../../response').createErrorResponse;
var md = require('markdown-it')();
const { Fragment } = require('../../model/fragment.js');

module.exports = (req, res) => {
  if (!req.params.id && !req.query.expand) {
    try {
      Fragment.byUser(req.user, false).then((fragments) => {
        res.send(createSuccessResponse({ fragments }));
      });
    } catch (err) {
      res.status(404).json(createErrorResponse(err));
    }
    return;
  }

  if (req.query.expand) {
    try {
      Fragment.byUser(req.user, true).then((fragments) => {
        res.send(createSuccessResponse({ fragments }));
      });
    } catch (err) {
      res.status(404).json(createErrorResponse(err));
    }
    return;
  }

  if (req.params.id && !req.query.expand) {
    if (req.params.id.split('.').pop() === 'html') {
      const paramID = req.params.id.split('.')[0];
      try {
        Fragment.byId(req.user, paramID).then((fragment) => {
          var htmlRender = md.render(fragment.data.toString());
          if (htmlRender.endsWith('\n')) {
            htmlRender = htmlRender.slice(0, -1);
          }
          res.send(
            createSuccessResponse({
              'Content-Type': 'text/html',
              'Content-Length': fragment.size,
              data: htmlRender,
            })
          );
        });
      } catch (err) {
        res.status(404).json(createErrorResponse(err));
      }
      return;
    }

    if (req.originalUrl.endsWith('/info')) {
      try {
        Fragment.byId(req.user, req.params.id).then((fragment) => {
          res.json(createSuccessResponse(fragment));
        });
      } catch (err) {
        res.status(404).json(createErrorResponse(err));
      }
      return;
    }
    try {
      Fragment.byId(req.user, req.params.id).then((fragment) => {
        res.send(
          createSuccessResponse({
            'Content-Type': fragment.type,
            'Content-Length': fragment.size,
            data: fragment.data.toString(),
          })
        );
      });
    } catch (err) {
      res.status(404).json(createErrorResponse(err));
    }
    return;
  }
};
