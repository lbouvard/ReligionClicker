<?php
session_start();

$id_utilisateur = $_SESSION['idt'];
$nbPriere = $_POST['total'];

//connexion base
$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');

if( $mysqli->connect_errno) {
	$erreur = "Echec de la connexion : ".$mysqli->connect_error;
}
else{
	$update = "UPDATE parameters
				SET ValeurParametre = ".$nbPriere."
				WHERE IdtMembre = ".$id_utilisateur."
				AND NomParametre = 'NombrePrieres'";
				
	$mysqli->query($update);			
	$mysqli->close();
}

?>