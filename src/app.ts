import express from "express";
import { prisma } from "./db";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

const handleResponse = (res: express.Response, data: any) => res.status(200).send(data);
const handleError = (res: express.Response, err: any) => res.status(err.status || 500).send(err);


//////////////////////////////
////////// GET /API-DOCS
//////////////////////////////
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//////////////////////////////
////////// GET /POSTS
//////////////////////////////
app.get("/posts", async (req, res) => {
  const pageSize = 5;
  const skip = (parseInt(String(req.query.page)) || 0) * pageSize;

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


//////////////////////////////
////////// GET /POSTS/:ID
//////////////////////////////
app.get("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return handleResponse(res, post);

  } catch (e) { return handleError(res, e); }
});



//////////////////////////////
////////// DELETE /POSTS/:ID
//////////////////////////////
app.delete("/posts/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    await prisma.deletedPost.create({ data: { id } });
    
    return handleResponse(res, post)
 
  } catch (e) { return handleError(res, e); }
});


//////////////////////////////
////////// GET /
//////////////////////////////
app.get("/", async (req, res) => {
  res.send(`
    <h1>Reign REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET /todos [? tags & author & title]
    GET, DELETE /todos/:id
  </pre>
  `.trim()
  );
});

module.exports = app