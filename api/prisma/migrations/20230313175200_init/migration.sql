-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `assetDiagramId` INTEGER NOT NULL,
    `parentAssetId` INTEGER NULL,

    UNIQUE INDEX `Asset_assetDiagramId_key`(`assetDiagramId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssetDiagram` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `xPoint` INTEGER NOT NULL,
    `yPoint` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssetConnection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `sourceId` INTEGER NOT NULL,
    `targetId` INTEGER NOT NULL,

    INDEX `AssetConnection_sourceId_key`(`sourceId`),
    INDEX `AssetConnection_targetId_key`(`targetId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_assetDiagramId_fkey` FOREIGN KEY (`assetDiagramId`) REFERENCES `AssetDiagram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_parentAssetId_fkey` FOREIGN KEY (`parentAssetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssetConnection` ADD CONSTRAINT `AssetConnection_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssetConnection` ADD CONSTRAINT `AssetConnection_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
