import express from "express";
import { logger } from "../logger";
import { apiURL, postProperties } from "./config";
import { getPosts, savePosts } from "./hn";
import { prisma } from "./db";
import { initScheduledPostFetch } from "./schedule";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));
initScheduledPostFetch("0 * * * *", async () =>
  savePosts(await getPosts(apiURL, postProperties))
);

app.get("/posts", async (req, res) => {
  const pageSize = 5;
  const skip = (parseInt(String(req.query.page)) || 0) * pageSize;
  const where: { tags?: object; author?: object; title?: object } = {};
  const tag = req.query._tag;
  const author = req.query.author;
  const title = req.query.title;

  const tagFilter = tag !== undefined ? { tags: { has: tag as string } } : {};

  return res.json(
    await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip,
      where: {
        ...tagFilter,
        author: { equals: author as string },
        title: { contains: title as string },
      },
    })
  );
});

app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const todo = await prisma.post.findUnique({
      where: { id },
    });

    return res.json(todo);
  } catch (e) {
    return res.send({ status: "error", error: e });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.post.delete({
      where: { id },
    });
    await prisma.deletedPost.create({ data: { id } });
    return res.send({ status: "ok" });
  } catch (e) {
    return res.send({ status: "error", error: e });
  }
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Reign Posts REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET /todos ? tags & author & title
    GET, DELETE /todos/:id
  </pre>
  `.trim()
  );
});

async function start() {
  savePosts(await getPosts(apiURL, postProperties));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

start();
