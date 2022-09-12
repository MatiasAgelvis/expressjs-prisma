-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "internal_id" TEXT NOT NULL,
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("internal_id")
);

-- CreateTable
CREATE TABLE "deletedPost" (
    "internal_id" SERIAL NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "deletedPost_pkey" PRIMARY KEY ("internal_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "deletedPost_id_key" ON "deletedPost"("id");
