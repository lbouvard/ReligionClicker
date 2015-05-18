<?php
	//ajouter code ici
?>
<div id="div_connexion">
	<span id="erreur"><?php echo $erreur; ?></span>

	<form action="index.php" method="post">
		<div class="form-group">
			<label for="login">Compte</label>
			<input type="text" class="form-control" id="login" name="login"  value="<?php if (isset($_POST['login'])) echo htmlentities(trim($_POST['login'])); ?>">
		</div>

		<div class="form-group">
			<label for="pass">Mot de passe</label>
			<input type="password" class="form-control" id="pass" name="pass"  value="<?php if (isset($_POST['pass'])) echo htmlentities(trim($_POST['login'])); ?>">
		</div>
		
		<input type="submit" name="connexion" class="btn btn-primary btn-lg" value="Se connecter">
	</form>
		
	<a href="inscription.php">Vous inscrire...</a>
</div>