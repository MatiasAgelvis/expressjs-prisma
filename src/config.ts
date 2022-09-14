import { Object } from "./types";

export const apiURL =
	"https://hn.algolia.com/api/v1/search_by_date?query=nodejs";

export const postProperties = {
	id: (obj: Object) => obj.id || parseInt(obj._tags[2].replace("story_", "")),
	title: (obj: Object) => String(obj.title || obj.story_title),
	author: (obj: Object) => obj.author,
	text: (obj: Object) => obj.comment_text || "",
	url: (obj: Object) => String(obj.url || obj.story_url),
	createdAt: (obj: Object) => obj.created_at,
	tags: (obj: Object) => obj._tags,
};