-- DropForeignKey
ALTER TABLE `AssetConnection` DROP FOREIGN KEY `AssetConnection_sourceId_fkey`;

-- DropForeignKey
ALTER TABLE `AssetConnection` DROP FOREIGN KEY `AssetConnection_targetId_fkey`;

-- AddForeignKey
ALTER TABLE `AssetConnection` ADD CONSTRAINT `AssetConnection_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssetConnection` ADD CONSTRAINT `AssetConnection_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `Asset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
