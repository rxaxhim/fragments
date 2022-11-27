// src/routes/index.js

const express = require('express');

// version and author from package.json
const { version, author } = require('../../package.json');

const { hostname } = require('os');

// Our authorization middleware
const { authenticate } = require('../authorization');

const { createSuccessResponse } = require('../response');

// Create a router that we can use to mount our API
const router = express.Router();

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all so you have to be authenticated in order to access.
 */
router.use(`/v1`, authenticate(), require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Clients shouldn't cache this response (always request it fresh)
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#controlling_caching
  res.setHeader('Cache-Control', 'no-cache');

  const data = {
    author,
    githubUrl: 'https://github.com/rxaxhim/fragments',
    version,
    hostname: hostname(),
  };

  // Send a 200 'OK' response with info about our repo
  res.status(200).json(createSuccessResponse(data));
});

module.exports = router;
