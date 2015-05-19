<?php
	session_start();
	include("include/upload.php");
	
	//initialisation variable
	$erreur = "";
	$nomReligion = "";
	$iconeReligion = "";
	$freqMajAuto = "";

	if( isset($_GET['get']) ){
		//récupération des paramètres
		$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
		
		if( $mysqli->connect_errno) {
			$erreur = "Echec de la connexion : ".$mysqli->connect_error;
		}
		else{
			$requete = "SELECT NomParametre, ValeurParametre
			FROM parameters 
			WHERE IdtMembre = '".$_SESSION['idt']."'";
						
			$resultat = $mysqli->query($requete);
			
			while( $donnees = $resultat->fetch_assoc() ){
				if( !is_null($donnees) ){
					if( $donnees['NomParametre'] == 'NomReligion' )
						$nomReligion = $donnees['ValeurParametre'];
					else if( $donnees['NomParametre'] == 'IconeReligion' )
						$iconeReligion = $donnees['ValeurParametre'];
					else if( $donnees['NomParametre'] == 'FreqMajAuto' )
						$freqMajAuto = $donnees['ValeurParametre'];
				}
			}
			
			$resultat->close();
			$mysqli->close();
		}
	}

	if( isset($_POST['nomrel']) ){
	
		//si on a un icone à charger
		if( $_FILES["icone"]["name"] != "" ){
			$erreur = upload();
		}

		if( $_POST['nomrel'] == "" || $_POST['periodemaj'] == "")
			$erreur = $erreur."Veuillez renseigner tous les champs. L'icône est optionnel.\r\n";
		else{

			//connexion à la base
			$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');

			if( $mysqli->connect_errno) {
				$erreur = $erreur."Echec de la connexion : ".$mysqli->connect_error."\r\n";
			}
			else{
				
				//param nom de la relgion
				$insert = " UPDATE parameters
								SET ValeurParametre = '".$_POST['nomrel']."'
							WHERE NomParametre = 'NomReligion'
							AND IdtMembre = ".$_SESSION['idt'];

				$mysqli->query($insert);


				//param fréquence de sauvegarde automatique.
				$insert = " UPDATE parameters
								SET ValeurParametre = '".$_POST['periodemaj']."''
							WHERE NomParametre = 'FreqMajAuto'
							AND IdtMembre = ".$_SESSION['idt'];
				
				$mysqli->query($insert);

				//on ferme la connexion
				$mysqli->close();
			}
		}

		
		if( $erreur == "" ){
			header("Location:membre.php");
		}
	}
?>

<div id="div_parametre">
	<span id="erreur"><?php echo $erreur; ?></span>

	<form id="donnees_parametre" method="post" >
		<div class="form-group">
			<label for="nomrel">Nom de la religion</label>
			<input type="text" class="form-control" id="nomrel" name="nomrel" value="<?php echo $nomReligion; ?>">
		</div>

		<div class="form-group">
			<label for="periodemaj">Fréquence maj. auto.(min)</label>
			<input type="text" class="form-control" id="periodemaj" name="periodemaj" value="<?php echo $freqMajAuto; ?>">
		</div>
		
		<div class="form-group">
			<label for="icone">Icone (max. 250x250)</label>
			<input type="text" class="form-control" id="iconedefaut" value="<?php echo $iconeReligion; ?>">
		</div>

		<input type="file" id="icone" name="icone" accept="image/*"> 

		<button type="button" id="val_parametre" class="btn btn-primary btn-lg">Enregistrer</button>
		<button type="button" id="annuler" class="btn btn-default btn-lg">Annuler</button>
	</form>

</div>