const { apiURL, postProperties } = require('../src/config')
const { prisma } = require('../src/db')
const { fetchAPI, getPosts, savePosts } = require('../src/hn')
const { testPost, Jest_Type_Post, Jest_Type_Posts } = require('./utils')


test('Get posts from API', async () => {
  const posts = await getPosts(apiURL, postProperties)
  expect(posts).toEqual(Jest_Type_Posts)
})

test('Save post to DB', async () => {
  await savePosts(testPost)
  expect(await prisma.post.findUnique(
    { where: { id: testPost.id }, select: { id: true } }))
    .toEqual({ id:testPost.id})
})

test('Fetch API json', async () => {
  const res = await fetchAPI(apiURL)
  expect(res && typeof res === 'object').toBe(true)
})