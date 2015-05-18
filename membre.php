<?php
	//code ici
?>

<span id="message">Connecté en tant que <?php echo htmlentities(trim($_SESSION['login'])); ?></span>

<button type="button" id="btn_parametre" class="btn btn-primary">Paramètres</button>
<button type="button" id="btn_stats" class="btn btn-primary">Statistiques</button>
<button type="button" id="btn_deconnexion" class="btn btn-primary">Déconnexion</button>