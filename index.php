<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Religion Clicker</title>

    <!-- Bootstrap -->
	<link href="css/layout.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
	
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
			<div class="col-xs-12 col-md-4">
				<!--<img class="fond" src="images/fond.png">-->
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
				<p><button id="lanceur_clicker" type="button" class="btn btn-primary btn-lg">Cliquez-moi!</button></p>
			</div>
			
			<div class="col-md-5">
				<h3>Partie centrale</h3>
			</div>
			
			<div class="col-md-3">
				<p>
					<button id="Niveau1" type="button" class="btn btn-primary btn-lg">Adèpte</button>
					<button id="Niveau1Del" type="button" class="btn btn-danger btn-sm">Vendre</button>
					<span id="Niveau1Items">0</span>
					<span id="Niveau1PrixItem">0</span>
				</p>
				<p>
					<button id="Niveau2" type="button" class="btn btn-primary btn-lg">Prêtre</button>
					<button id="Niveau2Del" type="button" class="btn btn-danger btn-sm">Vendre</button>
					<span id="Niveau2Items">0</span>
					<span id="Niveau2PrixItem">0</span>
				</p>
				<p>
					<button id="Niveau3" type="button" class="btn btn-primary btn-lg">Evêque</button>
					<button id="Niveau3Del" type="button" class="btn btn-danger btn-sm">Vendre</button>
					<span id="Niveau3Items">0</span>
					<span id="Niveau3PrixItem">0</span>
				</p>
			</div>
		</div>
		
	</div>

	<footer class="footer">
		<div class="container">
			<p class="text-muted">Team Ange&Demon.</p>
		</div>
    </footer>
	
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