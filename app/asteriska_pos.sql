/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.4.14-MariaDB : Database - asteriska_pos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`asteriska_pos` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `asteriska_pos`;

/*Table structure for table `pos_order` */

DROP TABLE IF EXISTS `pos_order`;

CREATE TABLE `pos_order` (
  `pos_order_id` int(11) NOT NULL AUTO_INCREMENT,
  `session_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `customer_pay` int(11) DEFAULT NULL,
  `change` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`pos_order_id`),
  KEY `session_id` (`session_id`),
  CONSTRAINT `pos_order_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `pos_session` (`session_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `pos_order` */

insert  into `pos_order`(`pos_order_id`,`session_id`,`customer_id`,`date`,`total_price`,`customer_pay`,`change`,`createdAt`,`updatedAt`) values (5,8,0,NULL,10000,20000,10000,'2021-12-26 23:27:20','2021-12-26 23:27:20'),(6,8,0,NULL,10000,20000,13500,'2021-12-26 23:43:15','2021-12-26 23:43:15'),(7,8,0,NULL,10000,20000,13500,'2021-12-27 04:11:04','2021-12-27 04:11:04'),(8,8,0,NULL,10000,20000,13500,'2021-12-27 04:12:42','2021-12-27 04:12:42');

/*Table structure for table `pos_order_list` */

DROP TABLE IF EXISTS `pos_order_list`;

CREATE TABLE `pos_order_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pos_order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `sub_total_price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pos_order_id` (`pos_order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pos_order_list_ibfk_1` FOREIGN KEY (`pos_order_id`) REFERENCES `pos_order` (`pos_order_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `pos_order_list_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `pos_order_list` */

insert  into `pos_order_list`(`id`,`pos_order_id`,`product_id`,`qty`,`sub_total_price`,`createdAt`,`updatedAt`) values (1,5,1,1,3500,'2021-12-26 23:27:20','2021-12-26 23:27:20'),(2,5,2,2,5000,'2021-12-26 23:27:20','2021-12-26 23:27:20'),(3,6,4,1,3500,'2021-12-26 23:43:15','2021-12-26 23:43:15'),(4,6,5,2,10000,'2021-12-26 23:43:15','2021-12-26 23:43:15'),(5,7,1,1,3500,'2021-12-27 04:11:04','2021-12-27 04:11:04'),(6,7,4,2,10000,'2021-12-27 04:11:04','2021-12-27 04:11:04'),(7,8,11,1,3500,'2021-12-27 04:12:42','2021-12-27 04:12:42'),(8,8,21,2,10000,'2021-12-27 04:12:42','2021-12-27 04:12:42');

/*Table structure for table `pos_session` */

DROP TABLE IF EXISTS `pos_session`;

CREATE TABLE `pos_session` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `start` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('working on','pause','done') DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pos_session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `pos_session` */

insert  into `pos_session`(`session_id`,`start`,`user_id`,`status`,`end`,`updatedAt`) values (1,'2021-12-24 10:37:30',1,'done','2021-12-24 21:03:30','2021-12-24 13:18:09'),(3,'2021-12-24 12:57:27',2,'working on',NULL,'2021-12-24 12:57:27'),(5,'2021-12-24 14:05:16',1,'done','2021-12-26 09:50:22','2021-12-26 09:50:22'),(6,'2021-12-26 09:53:35',1,'done','2021-12-26 17:10:07','2021-12-26 17:10:07'),(8,'2021-12-26 21:11:48',1,'working on',NULL,'2021-12-26 21:11:48');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_type` enum('consumable','service','storable product') DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `tax` float DEFAULT NULL,
  `parent_product_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

/*Data for the table `product` */

insert  into `product`(`id`,`category_id`,`barcode`,`sku`,`name`,`product_type`,`price`,`discount`,`cost`,`stock`,`image`,`tax`,`parent_product_id`,`createdAt`,`updatedAt`) values (1,6,'3033992020495','P06-001','Le Minerale 1500 ml','consumable',3500,0,3200,12,'1639986526989-levi1.jpg',0,0,'2021-12-20 07:48:47','2021-12-20 07:48:47'),(2,7,'303387889879','P07-001','Indomie Goreng','consumable',2500,0,2200,12,'1639988187055-lavi-assus.jpg',0,0,'2021-12-20 08:16:27','2021-12-20 08:16:27'),(3,7,'303387885487','P07-002','Indomie Goreng Rendang','consumable',2500,0,2200,12,'1639988318808-lavi-assus.jpg',0,0,'2021-12-20 08:18:38','2021-12-20 08:18:38'),(4,7,'303384575547','P07-002','Indomie Goreng Iga Penyet','consumable',2500,0,2200,12,'1639988353597-lavi-assus.jpg',0,0,'2021-12-20 08:19:13','2021-12-20 08:19:13'),(5,8,'3033845745456','P08-002','Sari Roti Coklat 50 gram','consumable',5000,0,4500,12,'1639988451717-avatar.jpg',0,0,'2021-12-20 08:20:51','2021-12-20 08:20:51'),(6,4,'3033845745466','P04-001','Frisian Flag Cokelat 225 ml','consumable',5800,0,5500,12,'1639988726936-36_In_(3).jpg',0,0,'2021-12-20 08:25:26','2021-12-20 08:25:26'),(7,4,'3033845745655','P04-002','Frisian Flag Strawberry 225 ml','consumable',5800,0,5500,12,'1639988765062-36_In_(3).jpg',0,0,'2021-12-20 08:26:05','2021-12-20 08:26:05'),(8,4,'3033845778445','P04-003','Frisian Flag Full Cream 225 ml','consumable',5800,0,5500,12,'1639988795458-36_In_(3).jpg',0,0,'2021-12-20 08:26:35','2021-12-20 08:26:35'),(9,4,'3033845455554','P04-004','Ultra Milk Full Cream 250 ml','consumable',6000,0,5800,12,'1639988996809-36_in_(1).jpg',0,0,'2021-12-20 08:29:56','2021-12-20 08:29:56'),(10,4,'3033845455875','P04-005','Ultra Milk Cokelat 250 ml','consumable',6000,0,5800,12,'1639989036323-36_in_(1).jpg',0,0,'2021-12-20 08:30:36','2021-12-20 08:30:36'),(11,4,'3033845455598','P04-004xx','Millo Cokelat 240 ml','consumable',11000,0,10500,12,'1640065644002-36_in_(1).jpg',0,0,'2021-12-20 08:31:42','2021-12-21 05:47:24'),(21,4,'30338454555547','P04-004','Millo test','consumable',11000,0,10500,12,'1640079240247-36_in_(1).jpg',0,0,'2021-12-21 09:34:00','2021-12-21 09:34:00'),(22,4,'','P04-004','Millo test 22x','consumable',11000,0,10500,12,'1640079368591-36_in_(1).jpg',0,0,'2021-12-21 09:36:08','2021-12-21 09:36:08'),(24,4,'','P04-004','Millo test 22xx','consumable',11000,0,10500,12,'1640083266146-36_in_(1).jpg',0,0,'2021-12-21 10:41:06','2021-12-21 10:41:06'),(26,4,'30338454555584','P04-004','Millo test 22xx','consumable',11000,0,10500,12,'1640085497215-36_in_(1).jpg',0,0,'2021-12-21 11:18:17','2021-12-21 11:18:17'),(27,4,'','P04-004','Millo test 223','consumable',11000,0,10500,12,'1640085513094-36_in_(1).jpg',0,0,'2021-12-21 11:18:33','2021-12-21 11:18:33');

/*Table structure for table `product_category` */

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_category` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

/*Data for the table `product_category` */

insert  into `product_category`(`id`,`parent_category`,`name`,`slug`,`foto`,`createdAt`,`updatedAt`) values (1,0,'Makanan','makanan','1639920264781-avatar.jpg','2021-12-19 13:24:24','2021-12-19 13:24:24'),(2,0,'Minuman','minuman','1639935717826-camp.jpg','2021-12-19 13:25:41','2021-12-19 17:41:57'),(3,2,'Soft Drink','soft-drink','1639920426141-1576151547-2x3.jpg','2021-12-19 13:27:06','2021-12-19 13:27:06'),(4,2,'Susu','susu','1639920490868-1576281233-images_(1).jpg','2021-12-19 13:28:10','2021-12-19 13:28:10'),(6,2,'Air Mineral','air-mineral','1639920565167-christian.jpg','2021-12-19 13:29:25','2021-12-19 13:29:25'),(7,1,'Mie Instan','mie-instan','1639920615755-christian.jpg','2021-12-19 13:30:15','2021-12-19 13:30:15'),(8,1,'Roti','roti','1639920657220-card-profile5-square.jpg','2021-12-19 13:30:57','2021-12-19 13:30:57'),(9,2,'Minuman Kesehatan','minuman-kesehatan','1639933262284-card-profile5-square.jpg','2021-12-19 17:01:02','2021-12-19 17:01:02'),(11,0,'Kosmetik','kosmetik','1639984429647-36_in_(1).jpg','2021-12-20 07:13:49','2021-12-20 07:13:49'),(12,0,'Kosmetikxz','kosmetikxz','1639984649299-36_In_(3).jpg','2021-12-20 07:17:29','2021-12-20 07:17:29'),(13,0,'Perabotan','Perabotan','1639985091642-bosch-drill-machine-500x500.jpg','2021-12-20 07:22:12','2021-12-20 07:24:51');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role` enum('cashier','admin') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`email`,`username`,`role`,`password`,`refresh_token`,`createdAt`,`updatedAt`) values (1,'narzo','narzo@gmail.com','narzo',NULL,'$2b$10$Cqb9pl0zb6eyxKetjltY8ORxUzJ4IurvUIWQDJC8posylzYo8T1se','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJuYXJ6byIsInVzZXJuYW1lIjoibmFyem8iLCJpYXQiOjE2NDIwNjY4NTksImV4cCI6MTY0MjE1MzI1OX0.R-8wKbXQNrGacQMMdUvPjRWxiAcdOUHVUn15JwNxsv8','2021-12-15 21:43:05','2022-01-13 16:40:59'),(2,'dhanz','dhani.satya007@gmail.com','dhanz',NULL,'$2b$10$5VKm4TNoynZ6ZXxpwJfYGedC9Z6BINqR9egX7wr6JBA/tZ80jmIIa','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiJkaGFueiIsInVzZXJuYW1lIjoiZGhhbnoiLCJpYXQiOjE2NDE3NTU2ODgsImV4cCI6MTY0MTg0MjA4OH0.ZzrIY3K-b2EuHwKHFz9qwwiGMt575rtp3zHO7kgtFSI','2021-12-24 12:56:54','2022-01-09 19:14:48');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
