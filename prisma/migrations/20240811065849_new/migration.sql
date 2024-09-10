/*
  Warnings:

  - You are about to drop the column `favoritedById` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Place` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `Place` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `visitingTime` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `PlacePhotos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewPhotos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[place_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlacePhotos" DROP CONSTRAINT "PlacePhotos_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceStatus" DROP CONSTRAINT "PlaceStatus_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewPhotos" DROP CONSTRAINT "ReviewPhotos_reviewId_fkey";

-- DropIndex
DROP INDEX "Place_userId_key";

-- DropIndex
DROP INDEX "Review_placeId_key";

-- DropIndex
DROP INDEX "Review_userId_key";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "favoritedById",
DROP COLUMN "userId",
ADD COLUMN     "favorited_by_id" TEXT,
ADD COLUMN     "is_checked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "createdAt",
DROP COLUMN "placeId",
DROP COLUMN "userId",
DROP COLUMN "visitingTime",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "place_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "visiting_time" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "PlacePhotos";

-- DropTable
DROP TABLE "PlaceStatus";

-- DropTable
DROP TABLE "ReviewPhotos";

-- CreateTable
CREATE TABLE "place_status" (
    "id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "is_shady_place" BOOLEAN NOT NULL,
    "is_camping" BOOLEAN NOT NULL,
    "perfect_time" TIMESTAMP(3) NOT NULL,
    "road" "Status" NOT NULL,
    "place_services" "Services" NOT NULL,

    CONSTRAINT "place_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_photos" (
    "id" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "photo_id_storage" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_photos" (
    "id" TEXT NOT NULL,
    "review_id" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "place_status_place_id_key" ON "place_status"("place_id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_place_id_key" ON "Review"("place_id");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_favorited_by_id_fkey" FOREIGN KEY ("favorited_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_status" ADD CONSTRAINT "place_status_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_photos" ADD CONSTRAINT "place_photos_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_photos" ADD CONSTRAINT "review_photos_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
