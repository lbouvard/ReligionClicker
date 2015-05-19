<?php
session_start();

$id_utilisateur = $_SESSION['idt'];
$donnees = "";

//Récupère les données en json.
$donnees = json_decode(json_decode(file_get_contents('php://input')), true);

//connexion base
$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');

if( $mysqli->connect_errno) {
	$erreur = "Echec de la connexion : ".$mysqli->connect_error;
}
else{
	foreach ($donnees as $item){
		$insert = "UPDATE saves
					SET GainSauvegarde = ".$item['gain'].",
						NbItemSauvegarde = ".$item['nbItem'].",
						PrixSauvegarde = ".$item['prix'].",
						ProductionSauvegarde = ".$item['production']."
					WHERE IdtMembre = ".$id_utilisateur."
					AND IdtShop = ".$item['idt'];
		$mysqli->query($insert);			
	}
	
	$mysqli->close();
}

?>