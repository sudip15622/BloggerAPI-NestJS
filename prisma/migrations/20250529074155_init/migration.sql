/*
  Warnings:

  - The values [red,green,blue] on the enum `AllowedColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AllowedColor_new" AS ENUM ('RED', 'GREEN', 'BLUE');
ALTER TABLE "Book" ALTER COLUMN "bookColor" TYPE "AllowedColor_new" USING ("bookColor"::text::"AllowedColor_new");
ALTER TYPE "AllowedColor" RENAME TO "AllowedColor_old";
ALTER TYPE "AllowedColor_new" RENAME TO "AllowedColor";
DROP TYPE "AllowedColor_old";
COMMIT;
