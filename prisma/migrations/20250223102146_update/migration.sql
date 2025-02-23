-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_userId_fkey`;

-- DropIndex
DROP INDEX `Image_userId_fkey` ON `Image`;
