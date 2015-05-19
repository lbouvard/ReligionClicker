<?php
session_start();

$erreur = "";

/* Permet de charger la sauvegarde d'une partie */
$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
		
if( $mysqli->connect_errno) {
	$erreur = "Echec de la connexion : ".$mysqli->connect_error;
}
else{
	// on récupère les paramètres
	$requete = "SELECT sp.NomArticle nom, sp.IconeArticle icone, maj.GainSauvegarde gain, maj.NbItemSauvegarde nbItem, 
						maj.PrixSauvegarde prix, maj.ProductionSauvegarde production, sp.CoeffAchatArticle coeffAchat, 
						sp.CoeffVenteArticle coeffVente 
				FROM saves AS maj
				INNER JOIN shop sp ON maj.IdtShop = sp.IdtArticle
				WHERE IdtMembre = ".$_SESSION['idt'];
				
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
/*
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

*/

?>