-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'VERIFIED', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
