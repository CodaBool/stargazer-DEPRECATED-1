/*
  Warnings:

  - You are about to drop the column `priority` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "priority";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "emailVerified";
