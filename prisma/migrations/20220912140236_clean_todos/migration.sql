/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `internal_id` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `deletedPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `internal_id` on the `deletedPost` table. All the data in the column will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Post_id_key";

-- DropIndex
DROP INDEX "deletedPost_id_key";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "internal_id",
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "deletedPost" DROP CONSTRAINT "deletedPost_pkey",
DROP COLUMN "internal_id",
ADD CONSTRAINT "deletedPost_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Todo";
