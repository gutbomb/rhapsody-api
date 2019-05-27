-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: localhost    Database: rhapsody
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) NOT NULL,
  `article_subtitle` varchar(255) DEFAULT NULL,
  `article_author` int(11) NOT NULL,
  `article_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `article_content` text NOT NULL,
  `article_tab` varchar(255) DEFAULT NULL,
  `article_image_filename` varchar(255) DEFAULT NULL,
  `article_image_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Home','rhap·so·dy -- noun: an effusively enthusiastic or ecstatic expression of feeling.',1,'2019-05-27 01:24:46','<p>I learned to knit the way many of us did&mdash;my mother taught me. She was staying with me to help while I recovered from the birth of my daughter, and during those quiet moments between naps and feedings and giggles and tearful expressions of love between mothers and daughters, Mom showed me how to knit a cotton dishrag. It was a simple gesture and I&rsquo;m sure she thought nothing of it, but to me it was an intangible yet permanent expression of love and care.</p>\n\n<p>From the moment I learned how to knit I hit the ground running. It wasn&rsquo;t long before I was fidgeting with double-points and lamenting too-tight cast-offs. Then suddenly I&rsquo;m driving to the next state with my infant in tow to pick up four angora rabbits and the momentum just continued to build. I sit and spin these soft bunny yarns with my daughter at my feet, hoping she&rsquo;ll grow up to be as loving and kind as her grandmother. The fiber and the craft&mdash;it all hearkens back to that connection from the teacher to the student and the giver and receiver. Nurture. That&rsquo;s what the fiber arts mean to me.</p>\n\n<p>My personal style, therefore, is hard to define. It is an amalgam of tactile and visual experiences, not connected by any one aesthetic, but rather by feeling. I started producing spinning fibers and yarns in order to share that experience. (And, of course, to keep my hands busy and out of trouble! Behaving myself has always been an uphill battle.) I strive to represent human emotion in my work, but also to spread joy and nurture. I guess it&rsquo;s my little way of making the world a softer, cozier place.</p>\n','home','lauren.jpg','article-image-left'),(2,'Wholesale','',1,'2019-05-27 01:25:34','<p>I am happy to offer any of my existing colorways as well as custom colorways on a variety of high quality bases to shops who embrace indie dyers and unique findings. This may include yarn, roving, batts, or loose fiber. I offer collaboration to designers and can fulfill yarn or roving &quot;of the month&quot; orders, coordinated sets of mini skeins, and kits specifically measured for specific designs.</p>\n\n<p>Available bases and pricing are subject to change. As such, please contact me for a current price list.</p>\n\n<p>Please send an email to <a href=\"mailto:mailto:info@rhapsodyfiber.com\">info@rhapsodyfiber.com</a> for a wholesale order form. Online ordering will available soon for existing retail customers!</p>\n','wholesale','wholesale.jpg','article-image-full'),(3,'Custom','',1,'2019-05-27 01:29:47','<p>Custom orders are always welcome! If you would like to make a custom order in any quantity, please <a href=\"http://rhapsodyfiber.com/index.php/download_file/view/49/176\" target=\"_blank\">click here</a> to download the form and email it to <a href=\"mailto:mailto:info@rhapsodyfiber.com\">info@rhapsodyfiber.com</a>.</p>\n\n<p>The form lists available bases and price per 100 gram skein or 4 ounce braid of roving. If you&#39;re looking for a specific base that isn&#39;t listed, please reach out as it may be available. I am also happy to accommodate smaller or larger quantities.</p>\n\n<p>Turnaround time will vary.</p>\n','custom','custom.jpg','article-image-full'),(4,'Classes','',1,'2019-05-27 01:27:37','<p>Something that I love about the Fiber Arts is the way the knowledge of spinning, knitting, and crocheting seems to pass down through generations. People usually remember learning these skills with fondness. As such, I&#39;m always excited to teach!</p>\n\n<p>I provide private lessons and group instruction to learners of all ages in the Salt Lake area with limited availability in Utah County.</p>\n\n<p>Please contact me to discuss availability and teaching fees for private and group instruction.</p>\n','classes','classes.jpg','article-image-full'),(5,'Rabbitry','French angora rabbits; support for owners; community resources',1,'2019-05-27 01:30:40','<p><strong>Litter planned for Spring 2017.</strong> Email to be placed on a waiting list or with any questions. Angora rabbits require a lot of care and attention, so I will only breed when there is high enough demand for kits or if I have the time to care for a full litter for the rest of their lives. As such, litters will be few and far between.</p>\n\n<p>I offer grooming services for angora owners on either a monthly or seasonal basis. Grooming (brushing, clipping nails trimming facial ornament hair and undersides as needed) starts at $15 per rabbit or can be done in exchange for wool.</p>\n\n<p>Because angora rabbits require so much care, I will happily provide lessons on grooming to anyone who purchases a kit from one of my litters, as well as ongoing support. If ever angora ownership proves to be too much, please bring back the rabbit to ensure a safe home. Angoras make great pets, 4-H projects, and fiber animals, but they are delicate creatures that require significant attention.</p>\n','rabbitry','rabbitry.jpg','article-image-full'),(6,'Shop','Where to Find Rhapsody Products',1,'2019-05-27 17:57:41','<p><strong>On the web</strong></p>\n\n<p><a href=\"http://rhapsodyfiber.etsy.com\">rhapsodyfiber.etsy.com</a></p>\n\n<p><strong>Brick and mortar</strong></p>\n\n<p><a href=\"https://www.facebook.com/isabelsyarnshop/\" target=\"_blank\">Isabel&#39;s Yarn Shop</a> in Heber City, Utah</p>\n\n<p><a href=\"http://knittinpretty.com\" target=\"_blank\">Knittin&#39; Pretty</a> in West Jordan, Utah</p>\n\n<p><a href=\"http://www.wasatchandwool.com/wp/\" target=\"_blank\">Wasatch &amp; Wool</a> in Park City, Utah</p>\n\n<p><strong>Markets and Festivals</strong></p>\n\n<p><a href=\"http://www.greatbasinfiberartsfair.org/\">Great Basin Fiber Arts Fair</a> in South Jordan, Utah</p>\n','shop',NULL,'null');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colorway_categories`
--

DROP TABLE IF EXISTS `colorway_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `colorway_categories` (
  `colorway_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `colorway_category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`colorway_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colorway_categories`
--

LOCK TABLES `colorway_categories` WRITE;
/*!40000 ALTER TABLE `colorway_categories` DISABLE KEYS */;
INSERT INTO `colorway_categories` VALUES (1,'Variegated'),(2,'Speckled'),(3,'Solid');
/*!40000 ALTER TABLE `colorway_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colorway_images`
--

DROP TABLE IF EXISTS `colorway_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `colorway_images` (
  `colorway_image_id` int(11) NOT NULL AUTO_INCREMENT,
  `colorway_image_filename` varchar(255) NOT NULL,
  `colorway_id` int(11) NOT NULL,
  PRIMARY KEY (`colorway_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colorway_images`
--

LOCK TABLES `colorway_images` WRITE;
/*!40000 ALTER TABLE `colorway_images` DISABLE KEYS */;
INSERT INTO `colorway_images` VALUES (17,'Switzerland.png',1),(18,'Switzerland_2.jpg',1),(19,'Switzerland_1.jpg',1),(20,'Samantha.png',2),(21,'Samantha_1.jpg',2),(22,'Samantha_2.png',2),(23,'Elliot.png',3),(24,'Elliot_1.jpg',3),(25,'PBJ.png',4),(26,'PBJ.jpg',4),(27,'Across_the_Night.png',5),(28,'Across_the_Night_1.jpg',5),(29,'Cranberry_Bog.png',6),(30,'Cranberry_Bog_1.jpg',6),(31,'Cranberry_Bog_2.jpg',6),(32,'Dark_Army.png',7),(33,'Dark_Army_1.jpg',7),(34,'American_Steampunk.png',8),(35,'American_Steampunk_1.jpg',8),(36,'fsociety.png',9),(37,'Darlene.png',10),(38,'Darlene_1.jpg',10),(39,'Harvest_Moon.png',11),(40,'Harvest_Moon_1.jpg',11),(41,'Harvest_Moon_2.png',11),(42,'White_Rose.png',12),(43,'White_Rose_1.jpg',12),(44,'La_Vie_en_Rose.png',13),(45,'La_Vie_en_Rose_1.jpg',13),(46,'La_Vie_en_Rose_2.jpg',13),(47,'Twilight_Sage.png',14),(48,'Twilight_Sage_1.jpg',14),(49,'Twilight_Sage_2.jpg',14),(50,'Salmon_Run.png',15),(51,'Salmon_Run.jpg',15),(54,'Degas.png',16),(55,'Degas_1.jpg',16);
/*!40000 ALTER TABLE `colorway_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colorways`
--

DROP TABLE IF EXISTS `colorways`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `colorways` (
  `colorway_id` int(11) NOT NULL AUTO_INCREMENT,
  `colorway_name` varchar(255) NOT NULL,
  `colorway_category_id` int(11) NOT NULL,
  PRIMARY KEY (`colorway_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colorways`
--

LOCK TABLES `colorways` WRITE;
/*!40000 ALTER TABLE `colorways` DISABLE KEYS */;
INSERT INTO `colorways` VALUES (1,'Switzerland',1),(2,'Samantha',1),(3,'Elliot',1),(4,'PB&J',1),(5,'Across the Night',1),(6,'Cranberry Bog',1),(7,'Dark Army',1),(8,'American Steampunk',1),(9,'fsociety',1),(10,'Darlene',1),(11,'Harvest Moon',1),(12,'White Rose',1),(13,'La Vie en Rosé ',2),(14,'Twilight Sage',2),(15,'Salmon Run',2),(16,'Degas',3);
/*!40000 ALTER TABLE `colorways` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `password_mustchange` int(11) DEFAULT NULL,
  `user_level` varchar(255) DEFAULT NULL,
  `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_email_validated` int(11) NOT NULL DEFAULT '0',
  `user_validation_string` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Lauren','laurenkp@byu.net','sha1$9879001b$1$40367b3a0e948438227af7fc96f2d4251fa32ba4',0,'admin','2019-05-26 19:17:15','2017-07-06 18:53:06','Palmer-Merrill',1,''),(8,'Jason','jasonrmerrill@icloud.com','sha1$d8316dab$1$cfd5ef840c0574d1c22b0481e8558ce0a179a2c9',0,'admin','2019-05-27 17:59:09','2019-05-26 19:17:36','Merrill',1,'');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-27 17:59:52
