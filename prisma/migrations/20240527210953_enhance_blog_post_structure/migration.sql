/*
  Warnings:

  - Added the required column `readTime` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "category" TEXT,
ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "readTime" INTEGER NOT NULL,
ADD COLUMN     "seoKeywords" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "tags" TEXT;
