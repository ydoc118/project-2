CREATE DATABASE voters_db;

USE voters_db;

CREATE TABLE `voter_ids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `registered` tinyint(1) NOT NULL DEFAULT '0',
  `address_one` varchar(50) NOT NULL,
  `address_two` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zip` varchar(9) NOT NULL,
  `county` varchar(50) NOT NULL,
  `d_license` varchar(100) NOT NULL,
  `registration_id` varchar(50) DEFAULT NULL,
  `voted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
)