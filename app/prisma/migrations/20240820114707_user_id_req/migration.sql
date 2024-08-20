/*
  Warnings:

  - Made the column `userId` on table `Column` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Column" ALTER COLUMN "userId" SET NOT NULL;
