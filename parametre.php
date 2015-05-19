<?php
	session_start();

	include("include/upload.php");

	//variable
	$erreur = "";

	if( !empty($_FILES) ){
		$erreur = upload();

		if( $erreur == "" ){
			header("Location:membre.php");
		}
	}

?>

<div id="div_parametre">
	<span id="erreur"><?php echo $erreur; ?></span>

	<form id="donnees_parametre" method="post" >
		<div class="form-group">
			<label for="nomrel">Nom de la religion</label>
			<input type="text" class="form-control" id="nomrel" name="nomrel" value="<?php if( isset($_SESSION['nom_religion']) ) echo $_SESSION['nom_religion']; ?>">
		</div>

		<div class="form-group">
			<label for="icone">Icone (max. 250x250)</label>
			<input type="text" class="form-control" id="iconedefaut" value="<?php if( isset($_SESSION['icone']) ) echo $_SESSION['icone']; ?>">
		</div>

		<input type="file" id="icone" name="icone" accept="image/*"> 

		<button type="button" id="val_parametre" class="btn btn-primary btn-lg">Enregistrer</button>
	</form>

</div>