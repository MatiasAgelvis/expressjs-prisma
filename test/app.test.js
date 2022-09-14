const request = require('supertest');
const app = require('../src/app');
const { testPost, Jest_Type_Post, Jest_Type_Posts } = require('./utils')

describe("GET /", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Available Routes');
  });
});

describe("GET /posts", () => {
  test("It should GET array of posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(Jest_Type_Posts);
  });
});
