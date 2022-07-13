-- MySQL Script generated by MySQL Workbench
-- Thu May 19 14:20:21 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_prod
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db_prod` ;

-- -----------------------------------------------------
-- Schema db_prod
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_prod` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `db_prod` ;


-- -----------------------------------------------------
-- Table `db_prod`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`categorias` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`categorias` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `cantidad` INT NOT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_prod`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`productos` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`productos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  `puntuacion` DECIMAL(2, 1) NOT NULL,
  `ciudades_id` INT UNSIGNED NOT NULL,
  `categorias_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`ciudades_id`) REFERENCES `ciudades`(`id`),
  FOREIGN KEY (`categorias_id`) REFERENCES `categorias`(id)
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Table `db_prod`.`caracteristicas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`caracteristicas` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`caracteristicas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `icono` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `db_prod`.`tipo_politicas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`tipo_politicas` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`tipo_politicas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `db_prod`.`caracteristicasXproductos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`caracteristicas_productos` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`caracteristicas_productos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `caracteristicas_id` INT UNSIGNED UNSIGNED NOT NULL,
  `productos_id` INT UNSIGNED UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`caracteristicas_id`) REFERENCES `caracteristicas`(id),
  FOREIGN KEY (`productos_id`) REFERENCES `productos`(id)
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_prod`.`politicas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`politicas` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`politicas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo_politicas_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`tipo_politicas_id`) REFERENCES `tipo_politicas`(id)
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `db_prod`.`politicasXproductos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`politicas_productos` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`politicas_productos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `politicas_id` INT UNSIGNED UNSIGNED NOT NULL,
  `productos_id` INT UNSIGNED UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`politicas_id`) REFERENCES `politicas`(id),
  FOREIGN KEY (`productos_id`) REFERENCES `productos`(id)
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_prod`.`ciudades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`ciudades` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`ciudades` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `pais` VARCHAR(50) NOT NULL,
  `lat` VARCHAR(20) NOT NULL,
  `lgn` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------- 
-- Table `db_prod`.`imagenes` 
-- ----------------------------------------------------- 
DROP TABLE IF EXISTS `db_prod`.`imagenes` ; 

CREATE TABLE IF NOT EXISTS `db_prod`.`imagenes` ( 
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  `url` VARCHAR(200) NOT NULL, 
  `titulo` VARCHAR(50) NOT NULL, 
  `productos_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`productos_id`) REFERENCES `productos`(id)
  ) 
  
ENGINE = InnoDB 
DEFAULT CHARACTER SET = utf8mb4 
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Procedure `PRODUCTOSALEATOREOS`
-- -----------------------------------------------------
DELIMITER //
DROP PROCEDURE IF EXISTS PRODUCTOSALEATOREOS//
CREATE PROCEDURE PRODUCTOSALEATOREOS()
BEGIN
	SELECT * FROM productos ORDER BY RAND() LIMIT 6;
END//

CREATE PROCEDURE PRODUCTOSENFECHA(IN fecha_inicio date, IN fecha_fin date)
BEGIN
    SELECT p.id FROM productos p 
    JOIN reservas r ON p.id = r.productos_id 
    where 
        (r.fecha_inicio between fecha_inicio and fecha_fin) and
        (r.fecha_fin between fecha_inicio and fecha_fin) and
        (fecha_inicio between r.fecha_inicio and r.fecha_fin) and
        (fecha_fin between r.fecha_inicio and r.fecha_fin)
        group by p.id;
END//

-- -----------------------------------------------------
-- Procedure `PRODUCTOSALEATOREOS`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS PRODUCTOSENFECHAYCIUDAD//
CREATE PROCEDURE PRODUCTOSENFECHAYCIUDAD(IN fecha_inicio date, IN fecha_fin date, IN ciudades_id INT)
BEGIN
    SELECT p.* FROM productos p
    where p.id not in (SELECT p.id FROM productos p 
    JOIN reservas r ON p.id = r.productos_id 
    where 
        (r.fecha_inicio between fecha_inicio and fecha_fin) or
        (r.fecha_fin between fecha_inicio and fecha_fin) or
        (fecha_inicio between r.fecha_inicio and r.fecha_fin) or
        (fecha_fin between r.fecha_inicio and r.fecha_fin)
        group by p.id) 
    and (p.ciudades_id = ciudades_id);
END//

DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Table `db_prod`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`roles` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `db_prod`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roles_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`roles_id`) REFERENCES `roles`(id)
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `db_prod`.`reservas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_prod`.`reservas` ;

CREATE TABLE IF NOT EXISTS `db_prod`.`reservas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `productos_id` INT UNSIGNED NOT NULL,
  `hora` TIME NOT NULL,
  `usuarios_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  FOREIGN KEY (`productos_id`) REFERENCES `productos`(id),
  FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(id)
  )

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- -----------------------------------------------------
-- Procedures
-- -----------------------------------------------------
DELIMITER //
-- -----------------------------------------------------
-- Procedure `PRODUCTOSALEATOREOS`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS PRODUCTOSALEATOREOS//
CREATE PROCEDURE PRODUCTOSALEATOREOS()
BEGIN
	SELECT * FROM productos ORDER BY RAND() LIMIT 6;
END//

-- -----------------------------------------------------
-- Procedure `PRODUCTOSALEATOREOS`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS PRODUCTOSENFECHA//
CREATE PROCEDURE PRODUCTOSENFECHA(IN fecha_inicio date, IN fecha_fin date)
BEGIN
    SELECT p.id FROM productos p 
    JOIN reservas r ON p.id = r.productos_id 
    where 
        (r.fecha_inicio between fecha_inicio and fecha_fin) or
        (r.fecha_fin between fecha_inicio and fecha_fin) or
        (fecha_inicio between r.fecha_inicio and r.fecha_fin) or
        (fecha_fin between r.fecha_inicio and r.fecha_fin)
        group by p.id;
END//

-- -----------------------------------------------------
-- Procedure `PRODUCTOSALEATOREOS`
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS PRODUCTOSENFECHAYCIUDAD//
CREATE PROCEDURE PRODUCTOSENFECHAYCIUDAD(IN fecha_inicio date, IN fecha_fin date, IN ciudades_id INT)
BEGIN
    SELECT p.* FROM productos p
    where p.id not in (SELECT p.id FROM productos p 
    JOIN reservas r ON p.id = r.productos_id 
    where 
        (r.fecha_inicio between fecha_inicio and fecha_fin) or
        (r.fecha_fin between fecha_inicio and fecha_fin) or
        (fecha_inicio between r.fecha_inicio and r.fecha_fin) or
        (fecha_fin between r.fecha_inicio and r.fecha_fin)
        group by p.id) 
    and (p.ciudades_id = ciudades_id);
END//

DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
