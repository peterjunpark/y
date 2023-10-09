/*
  Warnings:

  - You are about to drop the column `replyId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_replyId_fkey";

-- DropIndex
DROP INDEX "Post_replyId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "replyId",
ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_parentId_key" ON "Post"("parentId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
