<table class="tab_presentation">
	<tr>
		<td colspan="2" class="tab_titre">Général</td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre de prière actuelle</td>
		<td class="tab_valeur"><?php echo $_POST['now']; ?></td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre de prières totales</td>
		<td class="tab_valeur"><?php echo $_POST['total']; ?></td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre d’achat</td>
		<td class="tab_valeur"><?php echo $_POST['achat']; ?></td>
	</tr>
	<tr>
		<td class="tab_libelle">Nombre de pières par seconde</td>
		<td class="tab_valeur"><?php echo $_POST['seconde']; ?></td>
	</tr>
	<tr>
		<td colspan="2" class="tab_titre">Accomplissement</td>
	</tr>
	<tr>
		<td class="tab_libelle">Débloqué</td>
		<td class="tab_valeur">2/4 (50%)</td>
	</tr>
	<tr>
		<td colspan="2" class="tab_icone">
			<img src="images/cacher.png">
			<img src="images/cacher.png">
			<img src="images/cacher.png">
			<img src="images/cacher.png">
		</td>
	</tr>
</table>

<button type="button" id="fermer_stats" class="btn btn-default btn-lg">Fermer</button>