-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 17 Mai 2015 à 22:11
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
  PRIMARY KEY (`IdtMedaille`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `IdtMembre` int(11) NOT NULL AUTO_INCREMENT,
  `LoginMembre` varchar(50) COLLATE utf8_bin NOT NULL,
  `MdpMembre` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdtMembre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `parameters`
--

CREATE TABLE IF NOT EXISTS `parameters` (
  `IdtParametre` int(11) NOT NULL AUTO_INCREMENT,
  `IdtMembre` int(11) NOT NULL,
  `NomParametre` varchar(25) COLLATE utf8_bin NOT NULL,
  `ValeurParametre` varchar(25) COLLATE utf8_bin NOT NULL,
  `TypeParametre` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`IdtParametre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

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
