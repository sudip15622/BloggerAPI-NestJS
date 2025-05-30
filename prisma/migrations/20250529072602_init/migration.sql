-- CreateEnum
CREATE TYPE "AllowedColor" AS ENUM ('red', 'green', 'blue');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookColor" "AllowedColor" NOT NULL DEFAULT 'red';
