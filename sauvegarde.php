<?php

/****************************************** 
** Date 		: 03/05/2015
** Auteur 		: 
** Fichier 		: sauvegarde.php
** Description 	: Permet de sauvegarder 
** la partie en cours ou les paramètres.
*****************************************/

$type = "";
$id_utilisateur = "";
$donnees = "";

/*$type = $_POST['type'];
$id_utilisateur = $_POST['user'];*/
//$donnees = json_decode($_POST['json'], true);
$donnees = json_decode(json_decode(file_get_contents('php://input')), true);

foreach ($donnees as $item){
	//echo $item['nom'];
}

?>