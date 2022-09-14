import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const posts = [{ 
  id: 10, 
  title: 'Foo', 
  author: 'Alice', 
  text: 'Foo Bar Baz Pizza', 
  url: 'https://exemplary-sulfur.org', 
  createdAt: '2055-01-01T06:53:51.000Z', 
  tags: ['foo'] 
}, { 
  id: 11, 
  title: 'FooBar', 
  author: 'Bob', 
  text: 'Foo Bar Baz Pizza', 
  url: 'https://exemplary-sulfur.org', 
  createdAt: '2055-03-01T06:53:51.000Z', 
  tags: ['bar'] 
}, { 
  id: 12, 
  title: 'Bar', 
  author: 'Bob', 
  text: 'Foo Bar Baz Pizza', 
  url: 'https://exemplary-sulfur.org', 
  createdAt: '2055-02-01T06:53:51.000Z', 
  tags: ['foo', 'bar'] 
}
]

async function main() {
  posts.map(async post => {
    await prisma.post.upsert({
      where: { id: post.id },
      update: {},
      create: { ...post }
    })
  })

  console.log('🌱 Database Seeded')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })