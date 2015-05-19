<?php
session_start();

generer_niveau_defaut();

function generer_niveau_defaut(){

	$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
	
	if( $mysqli->connect_errno) {
		$erreur = "Echec de la connexion : ".$mysqli->connect_error;
	}
	else{
		//Récupération du magasin.
		$requete = "SELECT IdtArticle, NomArticle, IconeArticle, GainArticle, PrixArticle, CoeffAchatArticle, CoeffVenteArticle
					FROM shop";
					
		$resultat = $mysqli->query($requete);
		
		while( $donnees = $resultat->fetch_assoc() ){
			
			if( !is_null($donnees) ){
				$insert = "INSERT INTO saves
								(IdtMembre, IdtShop, GainSauvegarde, NbItemSauvegarde, PrixSauvegarde, ProductionSauvegarde)
							VALUES
								(".$_SESSION['idt'].", ".$donnees['IdtArticle'].",".$donnees['GainArticle'].", 0, ".$donnees['PrixArticle'].", 0)";
				$mysqli->query($insert);
			}
		}

		$resultat->close();
		$mysqli->close();
	}	
}

function generer_parametre_defaut(){

}

?>