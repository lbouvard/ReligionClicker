<?php
session_start();

$erreur = "";

/* Permet de charger la sauvegarde d'une partie */
$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
		
if( $mysqli->connect_errno) {
	$erreur = "Echec de la connexion : ".$mysqli->connect_error;
}
else{
	$mysqli->set_charset("utf8");
	
	// on récupère les paramètres
	$requete = "SELECT sp.IdtArticle idt, sp.NomArticle nom, sp.IconeArticle icone, maj.GainSauvegarde gain, maj.NbItemSauvegarde nbItem, 
						maj.PrixSauvegarde prix, maj.ProductionSauvegarde production, sp.CoeffAchatArticle coeffAchat, 
						sp.CoeffVenteArticle coeffVente 
				FROM saves AS maj
				INNER JOIN shop sp ON maj.IdtShop = sp.IdtArticle
				WHERE IdtMembre = ".$_SESSION['idt']."
				ORDER BY maj.IdtShop";
				
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