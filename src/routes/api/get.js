// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */
// import response
const response = require('../../response');

module.exports = (req, res) => {
  // TODO: this is just a placeholder to get something working...
  res.status(200).json(response.createSuccessResponse({ fragments: [] }));
};
