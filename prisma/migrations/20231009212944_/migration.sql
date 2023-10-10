/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[replyId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" RENAME CONSTRAINT "userId_postId" TO "Like_pkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likes",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "replyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_replyId_key" ON "Post"("replyId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "postId_idx" RENAME TO "Like_likedPostId_idx";

-- RenameIndex
ALTER INDEX "authorId_idx" RENAME TO "Post_authorId_idx";
