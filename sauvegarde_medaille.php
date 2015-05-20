<?php
session_start();

$id_utilisateur = $_SESSION['idt'];
$idtMedaille = $_POST['idt'];

//connexion base
$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');

if( $mysqli->connect_errno) {
	$erreur = "Echec de la connexion : ".$mysqli->connect_error;
}
else{
	$insert = "	INSERT INTO parameters
					(IdtMembre, NomParametre, ValeurParametre, TypeParametre)
				VALUES
					(".$id_utilisateur.", 'Medaille', ".$idtMedaille.", 'MEDALS')";
		
	$mysqli->query($insert);			
	$mysqli->close();
}

?>