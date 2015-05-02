<?php
// wamp\www\ReligionClicker\chargement.php

/* Permet de charger la sauvegarde d'une partie*/

$donnees[] = [
	"nom" => "Adepte",
	"icone" => "adepte.png",
	"gain" => 1,
	"nbItem" => 0,
	"prix" => 10,
	"production" => 0,
	"coeffAchat" => 0.4,
	"coeffVente" => 0.6,
	];

$donnees[] = [
	"nom" => "Prêtre",
	"icone" => "pretre.png",
	"gain" => 5,
	"nbItem" => 0,
	"prix" => 120,
	"production" => 0,
	"coeffAchat" => 0.5,
	"coeffVente" => 0.7,
	];

$donnees[] = [
	"nom" => "Evêque",
	"icone" => "eveque.png",
	"gain" => 100,
	"nbItem" => 0,
	"prix" => 1000,
	"production" => 0,
	"coeffAchat" => 0.5,
	"coeffVente" => 0.8,
	];

$donnees[] = [
	"nom" => "Eglise",
	"icone" => "eglise.png",
	"gain" => 1500,
	"nbItem" => 0,
	"prix" => 250000,
	"production" => 0,
	"coeffAchat" => 0.6,
	"coeffVente" => 0.8,
	];

$donnees[] = [
	"nom" => "Ange",
	"icone" => "ange.png",
	"gain" => 5000,
	"nbItem" => 0,
	"prix" => 1000000,
	"production" => 0,
	"coeffAchat" => 0.6,
	"coeffVente" => 0.8,
	];

echo json_encode($donnees, JSON_UNESCAPED_UNICODE);

?>