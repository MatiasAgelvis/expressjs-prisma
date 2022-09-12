import fetch from "cross-fetch";
import { logger } from "../logger";
import { prisma } from "./db";
var objectMapper = require("object-mapper");

type Post = {
  id: number;
  title: string;
  story_title?: string;
  author: string;
  createdAt: string;
  tags: Array<string>;
};

async function fetchAPI(url: RequestInfo | URL) {
  const res = await fetch(url);
  return await res.json();
}

export async function getPosts(url: RequestInfo | URL, properties: object) {
  // fetch API
  const res = await fetchAPI(url);
  // Get list of user deleted posts
  const deletedPosts: Array<number> = (await prisma.deletedPost.findMany()).map(
    (deleted) => deleted.id
  );

  logger.debug("deletedPosts", deletedPosts);

  let posts: Array<Post> = res.hits
    // select and rename post properties
    .map((post: object) => objectMapper(post, properties));

  // ensure that the title field is populated
  posts = posts.map((post: Post) => {
    return { ...post, title: String(post.title || post.story_title) };
  });
  // remove helper field
  posts.map((post: Post) => delete post.story_title);

  // ensure that the is field is populated
  posts = posts.map((post: Post) => {
    return {
      ...post,
      id: post.id || parseInt(post.tags[2].replace("story_", "")),
    };
  });

  // filter list of posts from API agaings deleted posts
  posts = posts.filter((post: Post) => !deletedPosts.includes(post.id));

  logger.debug("Posts", posts);
  return posts;
}

export function savePosts(posts: Array<Post>) {
  posts.map(
    async (post: Post) =>
      await prisma.post.upsert({
        where: { id: post.id },
        create: post,
        update: post,
      })
  );
}
