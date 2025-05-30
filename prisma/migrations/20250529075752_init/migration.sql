/*
  Warnings:

  - You are about to drop the column `bookColor` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "bookColor";

-- DropEnum
DROP TYPE "AllowedColor";
