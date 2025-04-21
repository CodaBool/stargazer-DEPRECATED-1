/*
  Warnings:

  - Added the required column `alias` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "alias" VARCHAR(50) NOT NULL;
