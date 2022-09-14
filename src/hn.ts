import { Post } from "@prisma/client";
import fetch from "cross-fetch";
import { logger } from "../logger";
import { Object } from "./types";
import { prisma } from "./db";

const objectApply = (obj: Object, properties: { [key: string]: Function }) => {
  const newObj: Object = {};
  for (const [key, val] of Object.entries(properties)) {
    newObj[key] = val(obj);
  }

  return newObj;
};

async function fetchAPI(url: RequestInfo | URL) {
  const res = await fetch(url);
  return await res.json();
}

export async function getPosts(url: RequestInfo | URL, properties: Object) {
  // fetch API
  const res = await fetchAPI(url);
  // Get list of user deleted posts
  const deletedPosts: Array<number> = (await prisma.deletedPost.findMany()).map(
    (deleted) => deleted.id
  );

  let posts: Array<Post> = res.hits
    // select, transform and rename post properties
    .map((post: Object) => objectApply(post, properties));

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
