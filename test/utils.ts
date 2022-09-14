const Jest_Type_Post = expect.
  objectContaining({
    id: expect.any(Number),
    title: expect.any(String),
    author: expect.any(String),
    text: expect.any(String),
    url: expect.any(String),
    createdAt: expect.any(String),
    tags: expect.arrayContaining([expect.any(String)]),
  })

const Jest_Type_Posts = expect.arrayContaining([Jest_Type_Post])

const testPost = { 
  id: 1, 
  title: 'FooBar', 
  author: 'MrPizza', 
  text: 'Foo Bar Baz Pizza', 
  url: 'https://exemplary-sulfur.org', 
  createdAt: '2055-01-01T06:53:51.000Z', 
  tags: ['foo', 'bar'] 
}

module.exports = { testPost, Jest_Type_Post, Jest_Type_Posts }