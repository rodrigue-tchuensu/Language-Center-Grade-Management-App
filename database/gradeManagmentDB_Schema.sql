
DROP SCHEMA IF EXISTS grade_management_db;
CREATE SCHEMA IF NOT EXISTS grade_management_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



USE grade_management_db;

CREATE TABLE IF NOT EXISTS credential (
`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
`username` VARCHAR(30) UNIQUE NOT NULL,
`password_hash` VARCHAR(128) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `role` (
`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
`name` VARCHAR(30) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `uk_roles_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `credential_roles` (
`credential_id` INTEGER UNSIGNED NOT NULL,
`role_id` INTEGER UNSIGNED NOT NULL,
PRIMARY KEY (`credential_id`, `role_id`),
CONSTRAINT `fk_credential_roles_credential_id` FOREIGN KEY (`credential_id`) REFERENCES credential(`id`), 
CONSTRAINT `fk_credential_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS student (
`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
`student_number` VARCHAR(10)  UNIQUE,
`firstname` VARCHAR(50) NOT NULL ,
`lastname`VARCHAR(50) NOT NULL ,
`date_of_birth` DATE NOT NULL ,
`phone_number`VARCHAR(30),
`email` VARCHAR(40),
`current_level` CHAR(4) NOT NULL ,
`credential_id` INTEGER UNSIGNED NOT NULL,
PRIMARY KEY (`id`), 
CONSTRAINT `fk_student_credential_id` FOREIGN KEY (`credential_id`) REFERENCES credential(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS staff  (
`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
`staff_number` VARCHAR(8)  UNIQUE,
`firstname` VARCHAR(50) NOT NULL,
`lastname`VARCHAR(50) NOT NULL,
`date_of_birth` DATE NOT NULL,
`phone_number`VARCHAR(30),
`email` VARCHAR(40),
`office_phone_number` VARCHAR(30),
`office_number` CHAR(5),
`credential_id` INTEGER UNSIGNED NOT NULL,
PRIMARY KEY (`id`),
CONSTRAINT `fk_staff_credential_id` FOREIGN KEY (`credential_id`) REFERENCES credential(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS exam (
`exam_date` DATE NOT NULL,
`exam_level` CHAR(4) NOT NULL,
PRIMARY KEY (`exam_date`, `exam_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS mark (
`subject_name` VARCHAR(30),
`score`DOUBLE,
`grade` VARCHAR(5),
`status` VARCHAR(6) NOT NULL DEFAULT 'FAILED',
`student_id` INTEGER  UNSIGNED NOT NULL,
`exam_date` DATE NOT NULL,
`exam_level` CHAR(4) NOT NULL,
`staff_id`INTEGER UNSIGNED NOT NULL,
PRIMARY KEY (`subject_name`, `student_id`, `exam_date`, `exam_level`),
CONSTRAINT `fk_mark_student_id` FOREIGN KEY (`student_id`) REFERENCES student(`id`),
CONSTRAINT `fk_mark_staff_id` FOREIGN KEY (`staff_id`) REFERENCES staff(`id`),
CONSTRAINT `fk_mark_exam_date_exam_level` FOREIGN KEY (`exam_date`, `exam_level`) REFERENCES exam(`exam_date`, `exam_level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
