-- migration.sql: Create `employee` table

CREATE TABLE IF NOT EXISTS `employee` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `phone_number` VARCHAR(255) NOT NULL UNIQUE,
    `address` VARCHAR(255),
    `gender` ENUM('male', 'female') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
