
// Note, doNOT use the create database, because heroku names the database the string after the last slash.
CREATE DATABASE burgers_db;
USE burgers_db;

DROP TABLE IF EXISTS `burgers`;

// Database created by jaws DB, but table isNOT

CREATE TABLE `burgers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `burger_name` varchar(255) NOT NULL,
  `devoured` tinyint(1) NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
