<?php 
	session_start();
	
	$total = 0;
	$encours = 0;
	$pourcentage = 0;
	$medailles = array();
	
	$idtMembre = $_SESSION['idt'];

	//Connexion base 
	$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
			
	if( $mysqli->connect_errno) {
		$erreur = "Echec de la connexion : ".$mysqli->connect_error;
	}
	else{
		$mysqli->set_charset("utf8");
		
		//Récupération des médailles.
		$requete = "SELECT COUNT(IdtMedaille) total 
					FROM medals";
						
		$resultat = $mysqli->query($requete);
		$total = intval($resultat->fetch_assoc()['total']);

		$resultat->close();
		
		//Récupération des accomplissement réussi
		$requete = "SELECT med.Nom, med.Icone, med.Description
					FROM parameters p
					INNER JOIN medals med ON p.ValeurParametre = med.IdtMedaille
					WHERE IdtMembre = '".$idtMembre."'
					AND NomParametre = 'Medaille'";
						
		$resultat = $mysqli->query($requete);
		
		while( $donnees = $resultat->fetch_assoc() ){
			if( !is_null($donnees) ){
				$medailles[] = $donnees;
			}
		}
		
		$resultat->close();
		$mysqli->close();
		
		$encours = count($medailles);
		$pourcentage = ($encours / $total) * 100;

	}
?>
<table class="tab_presentation">
	<tr>
		<td colspan="2" class="tab_titre">Général</td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre de prière actuelle</td>
		<td class="tab_valeur"><?php echo $_POST['now']; ?></td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre de prières totales</td>
		<td class="tab_valeur"><?php echo $_POST['total']; ?></td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre d’achat</td>
		<td class="tab_valeur"><?php echo $_POST['achat']; ?></td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre de pières par seconde</td>
		<td class="tab_valeur"><?php echo $_POST['seconde']; ?></td>
	</tr>
	<tr>
		<td colspan="2" class="tab_titre">Accomplissement</td>
	</tr>
	<tr>
		<td class="tab_libelle">Débloqué</td>
		<td class="tab_valeur"><?php echo $encours; ?>/<?php echo $total; ?>(<?php echo $pourcentage; ?>%)</td>
	</tr>
	<tr>
		<td colspan="2" class="tab_icone">
			<?php 
				foreach($medailles as $ligne){
					echo "<img src='images/".$ligne['Icone']."'>";
				}
				
				for($i = 0; $i < $total - $encours; $i++){
					echo "<img src='images/cacher.png'>";
				}
			?>
		</td>
	</tr>
</table>

<button type="button" id="fermer_stats" class="btn btn-default btn-lg">Fermer</button>