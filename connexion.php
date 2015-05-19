<?php
	session_start();

	//déclaration	
	$erreur = "";
	
	if( isset($_POST['login']) && isset($_POST['pass']) ){

		$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
		
		if( $mysqli->connect_errno) {
			$erreur = "Echec de la connexion : ".$mysqli->connect_error;
		}
		else{

			// on teste si une entrée de la base contient ce couple login / pass
			$requete = "SELECT IdtMembre 
						FROM members 
						WHERE LoginMembre = '".$mysqli->real_escape_string($_POST['login'])."'
						AND MdpMembre = '".$mysqli->real_escape_string(md5($_POST['pass']))."'";
						
			$resultat = $mysqli->query($requete);
			$donnees = mysqli_fetch_assoc($resultat);
			
			if( is_null($donnees) ){
				$erreur = "Compte inconnu. Veuillez vérifier votre compte et votre mot de passe.";
			}
			else{
				//on récupère l'identité du compte
				$idtMembre = $donnees['IdtMembre'];
				$resultat->close();

				//compte en cours
				$_SESSION['login'] = $_POST['login'];
				$_SESSION['idt'] = $idtMembre;

				//Récupération des paramètres.
				$requete = "SELECT NomParametre, ValeurParametre
							FROM parameters 
							WHERE IdtMembre = '".$idtMembre."'";
							
				$resultat = $mysqli->query($requete);
				
				while( $donnees = $resultat->fetch_assoc() ){
					
					if( !is_null($donnees) ){
						if( $donnees['NomParametre'] == "NomReligion" )
							$_SESSION['nom_religion'] = $donnees['ValeurParametre'];
						else
							$_SESSION['icone'] = $donnees['ValeurParametre'];
					}
				}		
			}


			$resultat->close();
			$mysqli->close();
		}
	}

	if( isset($_SESSION['login']) && $_SESSION['login'] != "" ){
		header("location:membre.php");
	}
?>

<div id="div_connexion">
	<span id="erreur"><?php echo $erreur; ?></span>

	<form>
		<div class="form-group">
			<label for="login">Compte</label>
			<input type="text" class="form-control" id="login" name="login"  value="<?php if (isset($_POST['login'])) echo htmlentities(trim($_POST['login'])); ?>">
		</div>

		<div class="form-group">
			<label for="pass">Mot de passe</label>
			<input type="password" class="form-control" id="pass" name="pass"  value="<?php if (isset($_POST['pass'])) echo htmlentities(trim($_POST['login'])); ?>">
		</div>
		
		<button type="button" id="connexion" class="btn btn-primary btn-lg">Se connecter</button>
		<button type="button" id="form_inscription" class="btn btn-default btn-lg">S'inscrire</button>
	</form>
		
</div>
