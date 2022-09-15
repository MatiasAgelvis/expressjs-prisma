const request = require('supertest');
const app = require('../src/app');
const { Jest_Type_Post, Jest_Type_Posts, randomElement } = require('./utils')
const { posts } = require('../prisma/seed');
const { prisma } = require('../src/db');

//////////////////////////////
////////// GET /
//////////////////////////////
describe("GET /", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Available Routes');
  });
});

//////////////////////////////
////////// GET /POSTS
//////////////////////////////
describe("GET /posts", () => {
  const testPost = randomElement(posts)

  test("It should GET array of posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Jest_Type_Posts);
  });
});

//////////////////////////////
////////// GET /POSTS/$ID
//////////////////////////////
describe("GET /posts/$id", () => {
  const testPost = randomElement(posts)
  test("It should GET a post by its id", async () => {
    const response = await request(app).get(`/posts/${testPost.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Jest_Type_Post);
    expect(response.body).toMatchObject({ id: testPost.id })
  });

  test("It should NOT GET a post when given a non existent id", async () => {
    const response = await request(app).get(`/posts/${99999999}`);
    expect(response.body).toEqual({});
  });
});

//////////////////////////////
////////// DELETE /POSTS/$ID
//////////////////////////////
describe("DELETE /posts/$id", () => {
  test("It should DELETE a post by its id", async () => {
    const testPost = randomElement(posts)
    const response = await request(app).delete(`/posts/${testPost.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Jest_Type_Post);
    expect(response.body).toMatchObject({ id: testPost.id })
    expect(await prisma.deletedPost.findUnique({ where: { id: testPost.id } })).toEqual({ id: testPost.id })
    expect(await prisma.post.findUnique({ where: { id: testPost.id } })).toBeNull()
  });
});
