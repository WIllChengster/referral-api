-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 18, 2020 at 11:14 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET AUTOCOMMIT = 0;
-- START TRANSACTION;
-- SET time_zone = "+00:00";



--
-- Database: `referral-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  user_id varchar(999) NOT NULL,
  clicks int(99) NOT NULL DEFAULT '0',
  `conversions` int(99) NOT NULL DEFAULT '0',
  `link_id` int(99) NOT NULL,
  `redirect_url` varchar(99) DEFAULT NULL,
  `referral_url` varchar(99) DEFAULT NULL,
  PRIMARY KEY(`link_id`)
)

--
-- Indexes for dumped tables
--

--
-- Indexes for table `links`
--
-- ALTER TABLE `links`
--   ADD PRIMARY KEY (`link_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `links`
--
-- ALTER TABLE `links`
--   MODIFY `link_id` int(99) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
-- COMMIT;
