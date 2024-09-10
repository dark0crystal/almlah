/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EASY', 'MID', 'TOUGH');

-- CreateEnum
CREATE TYPE "Services" AS ENUM ('NOTHING', 'FEW', 'ALOT');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('BASIC', 'VERIFIED', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'BASIC';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'BASIC';

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "governorate" TEXT NOT NULL,
    "place_type" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "favoritedById" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceStatus" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "isShadyPlace" BOOLEAN NOT NULL,
    "isCamping" BOOLEAN NOT NULL,
    "perfectTime" TIMESTAMP(3) NOT NULL,
    "road" "Status" NOT NULL,
    "place_services" "Services" NOT NULL,

    CONSTRAINT "PlaceStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitingTime" TIMESTAMP(3),
    "note" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacePhotos" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlacePhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewPhotos" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPlace" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_userId_key" ON "Place"("userId");

-- CreateIndex
CREATE INDEX "Place_name_governorate_place_type_idx" ON "Place"("name", "governorate", "place_type");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceStatus_placeId_key" ON "PlaceStatus"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_key" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_placeId_key" ON "Review"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "PlacePhotos_placeId_key" ON "PlacePhotos"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewPhotos_reviewId_key" ON "ReviewPhotos"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPlace_AB_unique" ON "_CategoryToPlace"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPlace_B_index" ON "_CategoryToPlace"("B");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_favoritedById_fkey" FOREIGN KEY ("favoritedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceStatus" ADD CONSTRAINT "PlaceStatus_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacePhotos" ADD CONSTRAINT "PlacePhotos_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewPhotos" ADD CONSTRAINT "ReviewPhotos_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPlace" ADD CONSTRAINT "_CategoryToPlace_B_fkey" FOREIGN KEY ("B") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
