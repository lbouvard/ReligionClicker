<?php
	session_start();
?>

<div id="menu_haut">
	<span id="message">Connecté en tant que <?php echo $_SESSION['login']; ?></span>

	<button type="button" id="parametre" class="btn btn-primary">Paramètres</button>
	<button type="button" id="stats" class="btn btn-primary">Statistiques</button>
	<button type="button" id="sauvegarde" class="btn btn-primary">Sauvegarder</button>
	<button type="button" id="deconnexion" class="btn btn-primary">Déconnexion</button>
</div>

<div id="accomplissements">
	<?php include("accomplissement.php"); ?>
</div>