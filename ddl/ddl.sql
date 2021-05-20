CREATE TABLE `exams` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login_id` VARCHAR(200) NOT NULL UNIQUE,
  `password_hash` VARCHAR(200) NULL,
  `type` INT NULL,
  `exam_id` INT NULL,
  `done_task_id` INT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exam_id_idx` (`exam_id`),
  INDEX `fk_done_task_id_idx` (`done_task_id`),
  CONSTRAINT `fk_user_exam_id`
    FOREIGN KEY (`exam_id`)
    REFERENCES `exams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE `tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` INT NULL,
  `type` INT NULL,
  `text_obj_key` VARCHAR(200) NULL,
  `image_obj_key` VARCHAR(200) NULL,
  `audio_obj_key` VARCHAR(200) NULL,
  `ms_before_starting` INT NULL,
  `ms_preparing` INT NULL,
  `ms_recording` INT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exam_id_idx` (`exam_id`),
  CONSTRAINT `fk_task_exam_id`
    FOREIGN KEY (`exam_id`)
    REFERENCES `exams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE `recordings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `task_id` INT NULL,
  `audio_obj_key` VARCHAR(200) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_task_id_idx` (`task_id`),
  INDEX `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_recording_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recording_task_id`
    FOREIGN KEY (`task_id`)
    REFERENCES `tasks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
