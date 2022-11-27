// src/routes/api/index.js

const express = require('express');

const contentType = require('content-type');
const Fragment = require('../../model/fragment');

// Create a router on which to mount our API endpoints
const router = express.Router();

// Define our first route, which will be: GET /v1/fragments
router.get('/fragments', require('./get'));
router.get('/fragments/:id', require('./get-id'));
router.get('/fragments/:id/info', require('./get-id-info'));

// Support sending various Content-Types on the body up to 5M in size
const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      // See if we can parse this content type. If we can, `req.body` will be
      // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
      // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
      const { type } = contentType.parse(req);
      return Fragment.isSupportedType(type);
    },
  });

// Use a raw body parser for POST, which will give a `Buffer` Object or `{}` at `req.body`
router.post('/fragments', rawBody(), require('./post'));

// Define our fifth route, which will be: DELETE /v1/fragments/:id
router.delete('/fragments/:id', require('./delete'));

router.put('/fragments/:id', rawBody(), require('./put'));

module.exports = router;
