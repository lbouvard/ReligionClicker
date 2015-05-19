<?php
	session_start();
?>

<span id="message">Connecté en tant que <?php echo $_SESSION['login']; ?></span>

<button type="button" id="parametre" class="btn btn-primary">Paramètres</button>
<button type="button" id="stats" class="btn btn-primary">Statistiques</button>
<button type="button" id="deconnexion" class="btn btn-primary">Déconnexion</button>

<script>
	var icone = "<?php if( isset($_SESSION['icone']) ) echo $_SESSION['icone']; else echo ''; ?>";
</script>