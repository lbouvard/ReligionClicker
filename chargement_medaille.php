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
	$requete = "SELECT med.IdtMedaille idt, med.Nom nom, med.Icone icone, med.Description description, med.Seuil seuil, ISNULL(par.IdtParametre) disponible 
				FROM medals med 
				LEFT JOIN parameters par ON med.IdtMedaille = par.ValeurParametre AND par.NomParametre = 'Medaille' AND par.IdtMembre = ".$idtMembre;
					
	$resultat = $mysqli->query($requete);
	
	while( $donnees = $resultat->fetch_assoc() ){
		if( !is_null($donnees) ){
			$medailles[] = $donnees;
		}
	}
		
	$resultat->close();
	$mysqli->close();
	
	echo json_encode($medailles, JSON_UNESCAPED_UNICODE);
}
?>