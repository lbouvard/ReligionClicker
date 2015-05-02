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
		        	<div id="affichage"></div>
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