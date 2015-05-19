<?php
	session_start();

	$erreur = "";

	// on teste l'existence de nos variables. On teste également si elles ne sont pas vides
	if( isset($_POST['login']) && isset($_POST['mdp']) && isset($_POST['confirme']) ) {
		
		// on teste les deux mots de passe
		if ($_POST['mdp'] != $_POST['confirme']) {
			$erreur = "Les 2 mots de passe sont différents.";	
		}
		elseif( $_POST['login'] == "" || $_POST['mdp'] == ""){
			$erreur = "Veuillez renseigner tous les champs.";
		}
		else {

			$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
			
			if( $mysqli->connect_errno) {
				$erreur = "Echec de la connexion : ".$mysqli->connect_error;
			}
			else{
				//on regarde si le login n'existe pas
				$requete = "SELECT IdtMembre 
							FROM members 
							WHERE LoginMembre = '".$mysqli->real_escape_string($_POST['login'])."'
							AND MdpMembre = '".$mysqli->real_escape_string(md5($_POST['mdp']))."'";
							
				$resultat = $mysqli->query($requete);
				$donnees = mysqli_fetch_assoc($resultat);
			
				if( is_null($donnees) ){
					
					$resultat->close();
					
					$requete = "INSERT INTO members 
									(LoginMembre, MdpMembre)
								VALUES
									('".$mysqli->real_escape_string($_POST['login'])."', '".$mysqli->real_escape_string(md5($_POST['mdp']))."')";
					
					$resultat = $mysqli->query($requete);

					//récupérer l'identifiant
					$_SESSION['idt'] = $mysqli->insert_id;
					$mysqli->close();

					header("Location:connexion.php");
				}
				else{
					$erreur = 'Le compte existe déjà.';
				}
			}
		}
	}

?>

<div id="div_inscription">
	<span id="erreur"><?php echo $erreur; ?></span>

	<form action="index.php" method="post" enctype="multipart/form-data">
		<div class="form-group">
			<label for="login">Nom du Compte</label>
			<input type="text" class="form-control" id="login" name="login"  value="<?php if (isset($_POST['login'])) echo htmlentities(trim($_POST['login'])); ?>">
		</div>

		<div class="form-group">
			<label for="pass">Mot de passe</label>
			<input type="password" class="form-control" id="mdp" name="mdp"  value="<?php if (isset($_POST['mdp'])) echo htmlentities(trim($_POST['mdp'])); ?>">
		</div>

		<div class="form-group">
			<label for="pass">Confirmation</label>
			<input type="password" class="form-control" id="confirme" name="confirme"  value="<?php if (isset($_POST['confirme'])) echo htmlentities(trim($_POST['confirme'])); ?>">
		</div>
		
		<button type="button" id="inscription" class="btn btn-primary btn-lg">Valider</button>
		<button type="button" id="annuler" class="btn btn-default btn-lg">Annuler</button>
	</form>
</div>