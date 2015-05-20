<?php
	//récupération des accomplissements
	$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
		
	$mysqli->set_charset("utf8");
	
	if( $mysqli->connect_errno) {
		$erreur = "Echec de la connexion : ".$mysqli->connect_error;
	}
	else{
		$requete = "SELECT med.Nom, med.Icone, med.Description
					FROM parameters p
					INNER JOIN medals med ON p.ValeurParametre = med.IdtMedaille
					WHERE IdtMembre = '".$_SESSION['idt']."'
					AND NomParametre = 'Medaille'";
					
		$resultat = $mysqli->query($requete);
		
		while( $donnees = $resultat->fetch_assoc() ){
			if( !is_null($donnees) ){
				$medailles[] = $donnees;
			}
		}	
		
		$resultat->close();
		$mysqli->close();
	}
	
	if( isset($medailles) )
	{
		foreach( $medailles as $ligne){
			
			echo "<div class='acc_bordure'>
					<div class='acc_centre'>
						<img class='acc_icone' src='images/".$ligne['Icone']."'>
							<div class='acc_desc'>
								<table class='acc_table'>
									<tr>
										<td class='acc_titre'>".$ligne['Nom']."</td>
									</tr>
									<tr>
										<td class='acc_desc'>".$ligne['Description']."</td>
									</tr>
								</table>
							</div>
					</div>
				</div>";
		}
	}
?>