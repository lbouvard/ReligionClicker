<?php
	session_start();
	
	$erreur = "";
	
	if( isset($_POST['connexion']) ) {
		if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['pass']) && !empty($_POST['pass']))) {

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
					$_SESSION['login'] = $_POST['login'];
				}
				
				$resultat->close();
				$mysqli->close();
			}

		}
		else {
			$erreur = 'Veuillez remplir tous les champs.';
		}
	}
	
	if( isset($_POST['inscription']) ) {
		
		// on teste l'existence de nos variables. On teste également si elles ne sont pas vides
		if ((isset($_POST['login']) && !empty($_POST['login'])) && (isset($_POST['pass']) && !empty($_POST['pass'])) && (isset($_POST['pass_confirm']) && !empty($_POST['pass_confirm']))) {
			
			// on teste les deux mots de passe
			if ($_POST['pass'] != $_POST['pass_confirm']) {
				$erreur = 'Les 2 mots de passe sont différents.';	
			}
			else{
				$mysqli = new mysqli('localhost', 'UserWeb', 'Uz28*Cesi', 'rcdb');
				
				if( $mysqli->connect_errno) {
					$erreur = "Echec de la connexion : ".$mysqli->connect_error;
				}
				else{
					//on regarde si le login n'existe pas
					$requete = "SELECT IdtMembre 
								FROM members 
								WHERE LoginMembre = '".$mysqli->real_escape_string($_POST['login'])."'
								AND MdpMembre = '".$mysqli->real_escape_string(md5($_POST['pass']))."'";
								
					$resultat = $mysqli->query($requete);
					$donnees = mysqli_fetch_assoc($resultat);
				
					if( is_null($donnees) ){
						
						$resultat->close();
						
						$requete = "INSERT INTO members 
										(LoginMembre, MdpMembre)
									VALUES
										('".$mysqli->real_escape_string($_POST['login'])."', '".$mysqli->real_escape_string(md5($_POST['pass']))."')";
						
						$resultat = $mysqli->query($requete); 

						$_SESSION['login'] = $_POST['login'];
					}
					else{
						$erreur = 'Le compte existe déjà.';
					}
				}
			}
		}
		else{			
			$erreur = 'Au moins un des champs est vide.';	
		}
	}
	
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>0 prières - Religion Clicker</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/layout.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  
  <body>
	<div class="container-fluid">
			<div class="row">
		        <div class="col-md-4 clicker">
		        	<div class="compteur">
		        		<span>Messiah Larry Religion</span>
		        	</div>

					<div class="compteur">
						<p>
							<span id="compteur_total">0</span>
							<span id="singulier"> prière</span>
						</p>
						<p>
							par secondes : 
							<span id="compteur_par_seconde">0</span>
						</p>
					</div>

					<img id="lanceur_clicker" class="img-responsive btn-clicker" src="images/priere.png">
		        </div>

		        <div class="col-md-5 parametre">
		        	<?php
						if( isset($_SESSION['login']) ){
							include("membre.php");
						}
						else{
							if( isset($_POST['inscription']) )
								include("inscription.php");
							else
								include("connexion.php");	
						}
					?>
		        </div>

		        <div id="shop" class="col-md-3">
		        	<p class="titre">Shop</p>
		        </div>
			</div>
	</div>

    <!-- jQuery -->
    <script src="js/jquery-1.11.2.min.js"></script>
    <!-- bootstrap -->
    <script src="js/bootstrap.min.js"></script>
    <!-- ClickerEngine -->
    <script src="js/plugin.js"></script>
  </body>
  
</html>

<?php
// wamp\www\ReligionClicker\index.php

/* Contrôle frontal */

?>