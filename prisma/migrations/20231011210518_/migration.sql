-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "threadId" INTEGER;

-- CreateTable
CREATE TABLE "Bookmark" (
    "bookmarkerId" TEXT NOT NULL,
    "bookmarkedPostId" INTEGER NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("bookmarkerId","bookmarkedPostId")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_following" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_following_AB_unique" ON "_following"("A", "B");

-- CreateIndex
CREATE INDEX "_following_B_index" ON "_following"("B");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_bookmarkerId_fkey" FOREIGN KEY ("bookmarkerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_bookmarkedPostId_fkey" FOREIGN KEY ("bookmarkedPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_following" ADD CONSTRAINT "_following_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_following" ADD CONSTRAINT "_following_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
