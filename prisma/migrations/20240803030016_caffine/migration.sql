/*
  Warnings:

  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "capital" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "city" VARCHAR(100) NOT NULL,
ADD COLUMN     "crowded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "destroyed" BOOLEAN NOT NULL DEFAULT false;
