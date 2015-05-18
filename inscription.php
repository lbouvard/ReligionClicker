<?php
	// on teste si le visiteur a soumis le formulaire
?>
<div id="div_inscription">
	<span id="erreur"><?php echo $erreur; ?></span>

	<form action="index.php" method="post">
		<div class="form-group">
			<label for="login">Nom du Compte</label>
			<input type="text" class="form-control" id="login" name="login"  value="<?php if (isset($_POST['login'])) echo htmlentities(trim($_POST['login'])); ?>">
		</div>

		<div class="form-group">
			<label for="pass">Mot de passe</label>
			<input type="password" class="form-control" id="pass" name="pass"  value="<?php if (isset($_POST['pass'])) echo htmlentities(trim($_POST['pass'])); ?>">
		</div>

		<div class="form-group">
			<label for="pass">Confirmation</label>
			<input type="password" class="form-control" id="pass_confirm" name="pass_confirm"  value="<?php if (isset($_POST['pass_confirm'])) echo htmlentities(trim($_POST['pass_confirm'])); ?>">
		</div>
		
		<input type="submit" name="inscription" class="btn btn-primary btn-lg" value="Valider">
	</form>
</div>