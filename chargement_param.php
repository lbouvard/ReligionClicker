<?php
session_start();

$erreur = "";
$idtMembre = $_SESSION['idt'];

/* Permet de charger la sauvegarde d'une partie */
$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
		
if( $mysqli->connect_errno) {
	$erreur = "Echec de la connexion : ".$mysqli->connect_error;
}
else{
	$mysqli->set_charset("utf8");
	
	//Récupération des paramètres.
	$requete = "SELECT NomParametre, ValeurParametre
				FROM parameters 
				WHERE IdtMembre = '".$idtMembre."'";
							
	$resultat = $mysqli->query($requete);
	
	while( $donnees = $resultat->fetch_assoc() ){
		if( !is_null($donnees) ){
			$jeux[] = $donnees;
		}
	}
		
	$resultat->close();
	$mysqli->close();
	
	echo json_encode($jeux, JSON_UNESCAPED_UNICODE);
}

?>