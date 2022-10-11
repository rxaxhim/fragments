// require post.js
const post = require('../../src/model/post');

// Write a test for POST /fragments
test('POST /fragments', async () => {
  // Write a test for POST /fragments
  const fragment = await post('ownerId', 'id', 'fragment');
  // Assert that the fragment is undefined
  expect(fragment).toBeUndefined();
});

// Write a test for POST /fragments/:id/data
test('POST /fragments/:id/data', async () => {
  // Write a test for POST /fragments/:id/data
  const fragmentData = await post('ownerId', 'id', 'fragmentData');
  // Assert that the fragmentData is undefined
  expect(fragmentData).toBeUndefined();
});

// trying to create a fragment with an unsupported type errors as expected
test('POST /fragments with unsupported type', async () => {
  // trying to create a fragment with an unsupported type errors as expected
  await expect(post('ownerId', 'id', 'fragment')).rejects.toThrow('Unsupported type: fragment');
});

// responses include a Location header with a URL to GET the fragment
test('POST /fragments response includes Location header', async () => {
  // responses include a Location header with a URL to GET the fragment
  const fragment = await post('ownerId', 'id', 'fragment');
  // Assert that the fragment is undefined
  expect(fragment).toBeUndefined();
});

// responses include all necessary and expected properties (id, created, type, etc), and these values match what you expect for a given request (e.g., size, type, ownerId)
test('POST /fragments response includes all necessary and expected properties', async () => {
  // responses include all necessary and expected properties (id, created, type, etc), and these values match what you expect for a given request (e.g., size, type, ownerId)
  const fragment = await post('ownerId', 'id', 'fragment');
  // Assert that the fragment is undefined
  expect(fragment).toBeUndefined();
});

// authenticated users can create a plain text fragment
test('authenticated users can create a plain text fragment', async () => {
  // authenticated users can create a plain text fragment
  const fragment = await post('ownerId', 'id', 'fragment');
  // Assert that the fragment is undefined
  expect(fragment).toBeUndefined();
});
