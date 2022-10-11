// Write a POST /fragments route using fragment class

const express = require('express');
const contentType = require('content-type');
const Fragment = require('../model/fragment');
const router = express.Router();
require('dotenv').config();

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

// Add API_URL
const API_URL = process.env.API_URL || 'http://localhost:8080';
// Make sure you support text/plain fragments
router.get('/fragments/:id', async (req, res) => {
  const { id } = req.params;
  const fragment = await Fragment.get(id);
  if (!fragment) {
    res.status(404).send('Not found');
    return;
  }
  res.set('Content-Type', fragment.type);
  res.set('Content-Length', fragment.size);
  res.set('Last-Modified', fragment.updated);
  res.set('Link', `<${API_URL}/fragments/${id}/formats>; rel="formats"`);
  res.send(await fragment.getData());
});
module.exports = router;
