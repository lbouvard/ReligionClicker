-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 20 Mai 2015 à 00:24
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `rcdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `medals`
--

CREATE TABLE IF NOT EXISTS `medals` (
  `IdtMedaille` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) COLLATE utf8_bin NOT NULL,
  `Icone` varchar(25) COLLATE utf8_bin NOT NULL,
  `Description` varchar(255) COLLATE utf8_bin NOT NULL,
  `Seuil` int(11) NOT NULL,
  PRIMARY KEY (`IdtMedaille`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=5 ;

--
-- Contenu de la table `medals`
--

INSERT INTO `medals` (`IdtMedaille`, `Nom`, `Icone`, `Description`, `Seuil`) VALUES
(1, '1ère prière', 'firstpriere.png', 'Vous avez reçu votre première prière. Félicitation.', 1),
(2, '1000ème prière', 'millepriere.png', 'Déjà mille prières... Vous êtes adoré.', 1000),
(3, 'Egypte', 'egypte.png', 'Vous êtes sur les pas des pharaons. Persévérez.', 500000),
(4, 'Grec', 'grec.png', 'Vous êtes un dieu vivant!', 10000000);

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `IdtMembre` int(11) NOT NULL AUTO_INCREMENT,
  `LoginMembre` varchar(50) COLLATE utf8_bin NOT NULL,
  `MdpMembre` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdtMembre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=20 ;

--
-- Contenu de la table `members`
--

INSERT INTO `members` (`IdtMembre`, `LoginMembre`, `MdpMembre`) VALUES
(1, 'lbouvard57', '682eee9bbce901f1a47bc8df7ec955af'),
(18, 'test4', '81dc9bdb52d04dc20036dbd8313ed055'),
(19, 'lolo', 'e10adc3949ba59abbe56e057f20f883e');

-- --------------------------------------------------------

--
-- Structure de la table `parameters`
--

CREATE TABLE IF NOT EXISTS `parameters` (
  `IdtParametre` int(11) NOT NULL AUTO_INCREMENT,
  `IdtMembre` int(11) NOT NULL,
  `NomParametre` varchar(25) COLLATE utf8_bin NOT NULL,
  `ValeurParametre` varchar(255) COLLATE utf8_bin NOT NULL,
  `TypeParametre` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdtParametre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=10 ;

--
-- Contenu de la table `parameters`
--

INSERT INTO `parameters` (`IdtParametre`, `IdtMembre`, `NomParametre`, `ValeurParametre`, `TypeParametre`) VALUES
(1, 1, 'NomReligion', 'Religion3', 'TEXT'),
(3, 1, 'IconeReligion', 'priere.png', 'ICON'),
(4, 19, 'NomReligion', 'Religion', 'TEXT'),
(5, 19, 'IconeReligion', 'priere.png', 'ICONE'),
(6, 19, 'NombrePrieres', '0', 'NOMBRE'),
(7, 19, 'FreqMajAuto', '2', 'MINUTE'),
(8, 1, 'NombrePrieres', '2940051', 'NOMBRE'),
(9, 1, 'FreqMajAuto', '4', 'MINUTE');

-- --------------------------------------------------------

--
-- Structure de la table `saves`
--

CREATE TABLE IF NOT EXISTS `saves` (
  `IdtSauvegarde` int(11) NOT NULL AUTO_INCREMENT,
  `IdtMembre` int(11) NOT NULL,
  `IdtShop` int(11) NOT NULL,
  `GainSauvegarde` bigint(20) NOT NULL,
  `NbItemSauvegarde` bigint(20) NOT NULL,
  `PrixSauvegarde` double NOT NULL,
  `ProductionSauvegarde` bigint(20) NOT NULL,
  PRIMARY KEY (`IdtSauvegarde`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=16 ;

--
-- Contenu de la table `saves`
--

INSERT INTO `saves` (`IdtSauvegarde`, `IdtMembre`, `IdtShop`, `GainSauvegarde`, `NbItemSauvegarde`, `PrixSauvegarde`, `ProductionSauvegarde`) VALUES
(1, 1, 1, 5, 10, 120, 174670),
(2, 18, 1, 1, 0, 10, 0),
(3, 18, 2, 5, 0, 120, 0),
(4, 18, 3, 100, 0, 1000, 0),
(5, 18, 4, 1500, 0, 250000, 0),
(6, 18, 5, 5000, 0, 1000000, 0),
(7, 1, 2, 20, 6, 1200, 418288),
(8, 19, 1, 1, 0, 10, 0),
(9, 19, 2, 5, 0, 120, 0),
(10, 19, 3, 100, 0, 1000, 0),
(11, 19, 4, 1500, 0, 250000, 0),
(12, 19, 5, 5000, 0, 1000000, 0),
(13, 1, 3, 100, 7, 17090, 2382840),
(14, 1, 4, 1500, 0, 250000, 0),
(15, 1, 5, 5000, 0, 1000000, 0);

-- --------------------------------------------------------

--
-- Structure de la table `shop`
--

CREATE TABLE IF NOT EXISTS `shop` (
  `IdtArticle` int(11) NOT NULL AUTO_INCREMENT,
  `NomArticle` varchar(25) COLLATE utf8_bin NOT NULL,
  `IconeArticle` varchar(25) COLLATE utf8_bin NOT NULL,
  `GainArticle` int(11) NOT NULL,
  `PrixArticle` int(11) NOT NULL,
  `CoeffAchatArticle` float NOT NULL,
  `CoeffVenteArticle` float NOT NULL,
  `TypeArticle` varchar(10) COLLATE utf8_bin NOT NULL,
  `CibleArticle` int(11) NOT NULL,
  PRIMARY KEY (`IdtArticle`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=6 ;

--
-- Contenu de la table `shop`
--

INSERT INTO `shop` (`IdtArticle`, `NomArticle`, `IconeArticle`, `GainArticle`, `PrixArticle`, `CoeffAchatArticle`, `CoeffVenteArticle`, `TypeArticle`, `CibleArticle`) VALUES
(1, 'Adepte', 'adepte.png', 1, 10, 0.4, 0.6, 'Primary', 1),
(2, 'Prêtre', 'pretre.png', 5, 120, 0.5, 0.7, 'Primary', 2),
(3, 'Evêque', 'eveque.png', 100, 1000, 0.5, 0.8, 'Primary', 3),
(4, 'Eglise', 'eglise.png', 1500, 250000, 0.6, 0.8, 'Primary', 4),
(5, 'Ange', 'ange.png', 5000, 1000000, 0.6, 0.8, 'Primary', 5);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
