/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `username` varchar(256) NOT NULL,
  `hash_pass` varchar(256) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `bp_med` varchar(256) DEFAULT 'none',
  `sugar_med` varchar(256) DEFAULT 'none',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;