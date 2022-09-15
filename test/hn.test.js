const { apiURL, postProperties } = require('../src/config')
const { prisma } = require('../src/db')
const { fetchAPI, getPosts, savePosts } = require('../src/hn')
const { testPost, Jest_Type_Post, Jest_Type_Posts, randomElement } = require('./utils')
const { deletedPosts } = require('../prisma/seed');

test('Get posts from API', async () => {
  const posts = await getPosts(apiURL, postProperties)
  expect(posts).toEqual(Jest_Type_Posts)
})

test('Save post to DB', async () => {
  savePosts(testPost)
  await setTimeout(function () {}, 100);
  expect(await prisma.post.findUnique({ where: { id: testPost.id } })).toMatchObject({ id: testPost.id })
})

test('Not save post to DB that is on deleted Posts table', async () => {
  const notPost = testPost
  notPost.id = randomElement(deletedPosts).id
  savePosts(notPost)
  expect(await prisma.post.findUnique(
    { where: { id: notPost.id } })).toBeNull()
})

test('Fetch API json', async () => {
  const res = await fetchAPI(apiURL)
  expect(res && typeof res === 'object').toBe(true)
})