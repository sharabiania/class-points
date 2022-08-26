CREATE DATABASE IF NOT EXISTS class_points_dev;

USE class_points_dev;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  c_id INT,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_user_cohort_id` FOREIGN KEY (`c_id`) REFERENCES `cohorts` (`id`)
);

CREATE TABLE `cohorts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `finalized` BOOL default false,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `point_types`
--

CREATE TABLE `point_types` (
  `ty_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `point_value` int NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ty_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `st_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `nick_name` varchar(50) DEFAULT NULL,
  `c_id` int NOT NULL,
  PRIMARY KEY (`st_id`),
  UNIQUE KEY `name` (`name`),
  KEY `FK_student_cohort_id` (`c_id`),
  CONSTRAINT `FK_student_cohort_id` FOREIGN KEY (`c_id`) REFERENCES `cohorts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



create table old_ranks (
	st_id int not null unique,
  ranking int default 0,  
  constraint FK_old_ranks_student_id foreign key (st_id) references students(st_id)
);

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `pt_id` int NOT NULL AUTO_INCREMENT COMMENT 'point transaction id ',
  `st_id` int NOT NULL COMMENT 'student id',
  `note` varchar(200) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ty_id` int NOT NULL COMMENT 'point type id',
  PRIMARY KEY (`pt_id`),
  KEY `FK_point_type_id` (`ty_id`),
  KEY `FK_transaction_point_type` (`st_id`),
  CONSTRAINT `FK_point_type_id` FOREIGN KEY (`ty_id`) REFERENCES `point_types` (`ty_id`),
  CONSTRAINT `FK_transaction_point_type` FOREIGN KEY (`st_id`) REFERENCES `students` (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='points transactions';
