const app = require('./app')
import { apiURL, postProperties } from "./config";
import { getPosts, savePosts } from "./hn";
import { initScheduledFunction } from "./schedule";

async function server() {
  
  const port = process.env.PORT || 3000;
  
  // seed database on server start
  savePosts(await getPosts(apiURL, postProperties));

  initScheduledFunction("0 * * * *", async () =>
    savePosts(await getPosts(apiURL, postProperties))
  );


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

server();