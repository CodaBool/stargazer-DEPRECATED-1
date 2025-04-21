/*
  Warnings:

  - You are about to alter the column `content` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3000)`.
  - You are about to alter the column `name` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(80)`.
  - You are about to alter the column `description` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3000)`.
  - You are about to alter the column `type` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `coordinates` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(25)`.
  - You are about to alter the column `faction` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `source` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `alias` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "content" SET DATA TYPE VARCHAR(3000);

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "name" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(3000),
ALTER COLUMN "type" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "coordinates" SET DATA TYPE VARCHAR(25),
ALTER COLUMN "faction" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "source" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "alias" SET DATA TYPE VARCHAR(16);
