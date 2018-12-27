SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`Phone` varchar(10) NOT NULL,
  `DOB` date NOT NULL,
  `Permission` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `cards`
-- ----------------------------
DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `Id` VARCHAR(16) NOT NULL,
  `Money` BIGINT DEFAULT 0 NOT NULL,
  `UserId` INT NOT NULL,
  `IsClosed` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`Id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for `transaction`
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
	`CreatedTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `Money` BIGINT DEFAULT 0 NOT NULL,
  `SrcCardId` VARCHAR(16) NOT NULL,
	`DesCardId` VARCHAR(16) NOT NULL,
  `Message` NVARCHAR(50),
  PRIMARY KEY (`Id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
 -- ----------------------------
-- Table structure for `listReceived`
-- ----------------------------
DROP TABLE IF EXISTS `listReceived`;
CREATE TABLE `listReceived` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
	`CardId` VARCHAR(16) NOT NULL,
  `Name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`Id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 

DROP TABLE IF EXISTS `userRefreshTokenExt`;
CREATE TABLE `userRefreshTokenExt` (
  `userId` int(11) NOT NULL,
  `refreshToken` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `rdt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `otp`;
CREATE TABLE `otp` (
  `userId` int(11) NOT NULL,
	`otp` VARCHAR(6) NOT NULL,
  `createdTime` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`userId`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;