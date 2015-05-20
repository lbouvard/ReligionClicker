$(document).ready(function() {
	
	/*************************************
	**
	**	INITIALISATION VARIABLES
	**
	**************************************/
	var gbGainTotal = 0;
	var gbGainParSeconde = 0;
	var gbTabProducteur = new Array();
	var gbTabAccomplissement = new Array();
	var gbSingulier = true;
	var Niveaux;
	var Params;
	var Medailles;
	var $conteneurShop = $('#shop');
	var tmSauvergarde;

	//Constante
	var QUANTUM = 10;
	var UNITETEMPS = 60 * 1000;		//1 minute en ms

	/*************************************
	**
	**	INITIALISATION PAGE
	**
	**************************************/
	//chargement de la fenêtre de connexion
    $.ajax({
		type: "GET",
		url: 'connexion.php',
		cache: false,
		success: function(data){
			$('#bloc_central').html(data);
		}
    });
	
	if( connecte == "oui" ){
		chargerSauvegarde();
		chargerParametre(false);
		chargerMedaille();
	}

	//verification des achats possibles
	//a faire

	/************************************
	**
	**	TIMER
	**
	************************************/
	//mise à jour du compteur
	setInterval(function (){ maj_score() }, 1);
	//mise à jour des producteurs
	setInterval(function (){ maj_production() }, 100);
	//mise à jour du titre de la barre de l'explorateur internet
	setInterval(function (){ maj_titre() }, 2000);
	//sauvegarde auto (par défaut 2)
	tmSauvegarde = setInterval(function (){ sauvegarde_auto() }, 2 * UNITETEMPS);


	/*************************************
	**
	**	TRIGGERS
	**
	**************************************/
	//ajout de prière par clic
	$('#lanceur_clicker').on( 'click', function(){
		gbGainTotal++;
	});

	//Achat d'un item
	$(document).on( 'click', "div[id^='item']", function(){
		var index = $(this)[0].id.substr(4,1);
		var obj = gbTabProducteur[index];
		obj.AjouterItem(1);

		$(this).find('#nbItem')[0].innerHTML = obj.getNombreItem();
		$(this).find('#prixItem')[0].innerHTML = obj.getPrix();
	});

	/*$(document).on( 'mouseenter', "div[id^='item']", function(){
		$(this).tooltip('show');
	});*/
	
	//connexion
	$(document).on( 'click', '#connexion', function(){
		
		$.ajax({
			type: "POST",
			url: 'connexion.php',
			data: { login: $('#login').val(), pass: $('#pass').val() },
			success: function(data){
				$('#bloc_central').html(data);

				if( data.indexOf('div_connexion', 0) == -1 ){
					connecte = "oui";
					chargerSauvegarde();
					chargerParametre(true);
					chargerMedaille();
					
					$('[data-toggle="tooltip"]').tooltip();
				}
			}
		});	
	});

	//deconnexion
	$(document).on( 'click', '#deconnexion', function(){
		$.ajax({
			type: "POST",
			url: 'deconnexion.php',
			success: function(data){
				//$('#bloc_central').html(data);
			}
		});
		document.location.href = 'index.php';
	});

	//formulaire inscription
	$(document).on( 'click', '#form_inscription', function(){
		$.ajax({
			type: "POST",
			url: 'inscription.php',
			success: function(data){
				$('#bloc_central').html(data);
			}
		});
	});

	//validation de l'inscription
	$(document).on( 'click', '#inscription', function(){
		//inscription + retour page 
		$.ajax({
			type: "POST",
			url: 'inscription.php',
			data: { login: $('#login').val(), mdp: $('#mdp').val(), confirme: $('#confirme').val() },
			success: function(data){
				$('#bloc_central').html(data);
			}
		});

		//génération paramètres défaut
		$.ajax({
			type: "GET",
			url: 'defaut.php',
			cache: false,
	    });
	});	

	//Annuler l'inscription ou les paramètres
	$(document).on( 'click', '#annuler', function(){
		$.ajax({
			type: "GET",
			url: 'connexion.php',
			cache: false,
			success: function(data){
				$('#bloc_central').html(data);
			}
    	});
	});

	//formulaire paramètre
	$(document).on( 'click', '#parametre', function(){
		$.ajax({
			type: "GET",
			url: 'parametre.php',
			data : 'get',
			success: function(data){
				$('#accomplissements').html(data);
			}
		});
	});

	//validation des parametres
	$(document).on( 'click', '#val_parametre', function(){
		
		var data = new FormData($('#donnees_parametre')[0]);

		$.ajax({
			type: "POST",
			url: 'parametre.php',
			data: data,
			processData: false,
			contentType: false,
			success: function(data){
				$('#bloc_central').html(data);

				//si le formulaire à été bien traité
				if( data.indexOf('div_parametre', 0) == -1 ){
					chargerParametre(false);
				}
			}
		});
	});		

	//sauvegarde des données de l'utilisateur
	$(document).on( 'click', '#sauvegarde', function() {
		sauvegarder();
	});

	//ouvre les statistiques
	$(document).on( 'click', '#stats', function(){

		var totalpriere = 0;
		var nbachat = 0;

		//on parcours les données du joueur
		for(i=0; i < gbTabProducteur.length; i++){
			var obj = gbTabProducteur[i];
			totalpriere += obj.getProduction();
			nbachat += obj.getNombreItem();
		}	

		$.ajax({
			type: "POST",
			url: 'statistique.php',
			data: { now: $('#compteur_total').text(), total: totalpriere, achat: nbachat, seconde: $('#compteur_par_seconde').text() },
			success: function(data){
				$('#accomplissements').html(data);
			}
		});
	});

	//ferme les statistiques
	$(document).on( 'click', '#fermer_stats', function(){
		$.ajax({
			type: "GET",
			url: 'connexion.php',
			cache: false,
			success: function(data){
				$('#bloc_central').html(data);
			}
    	});
	});
	
	$('#Niveau1Del').on( 'click', function() {

		var obj = gbTabProducteur[0];
		obj.RetirerItem();
		$('#Niveau1Items').html(obj.getNombreItem());
		$('#Niveau1PrixItem').html(obj.getPrix());		
	})

	$('#Niveau2Del').on( 'click', function() {
		
		var obj = gbTabProducteur[1];
		obj.RetirerItem();
		$('#Niveau2Items').html(obj.getNombreItem());
		$('#Niveau2PrixItem').html(obj.getPrix());		
	})

	$('#Niveau3Del').on( 'click', function() {
		
		var obj = gbTabProducteur[2];
		obj.RetirerItem();
		$('#Niveau3Items').html(obj.getNombreItem());
		$('#Niveau3PrixItem').html(obj.getPrix());		
	})


	/*************************************
	**
	**	FONCTIONS
	**
	**************************************/
	
	function Niveau(pIdt, pNom, pIcone, pGainParSeconde, pNbItem, pPrix, pProduction, pCoeffAchat, pCoeffVente){
		
		//attributs
		this.idt = parseInt(pIdt);
	    this.nom = pNom;
		this.icone = pIcone;
	    this.gainParSeconde = parseInt(pGainParSeconde);
		this.nombreItem = parseInt(pNbItem);
	    this.prix = parseInt(pPrix);
		this.production = Number(pProduction);
	    this.coeffAchat = parseFloat(pCoeffAchat);
	    this.coeffVente = parseFloat(pCoeffVente);	    
		this.prixVente = (this.prix * this.coeffVente);						//prix de vente calculé
		this.gainTotalParSeconde = this.nombreItem * this.gainParSeconde;	//gain total de prière par seconde

		//tableau pour mémoriser les différents prix d'achat - à chaque achat, le prix d'un item augmente.
		this.TablePrix = [pPrix];

		//Methode - Permet d'ajouter des prières par seconde
	    this.AjouterGainParSeconde = function(type, valeur) {
			
	        if( type == 'unitaire')
	        	this.gainParSeconde = this.gainParSeconde + valeur;
	        else if ( type == 'multiple' )
	        	this.gainParSeconde = this.gainParSeconde * valeur;
	        else if ( type == 'pourcentage')
	        	this.gainParSeconde = this.gainParSeconde + ((this.gainParSeconde * valeur) / 100);

			//mise à jour du gain
	        this.MajGainTotalParSeconde();
	    } 

		//Methode - Permet d'ajuster le prix d'achat du niveau suite à l'achat ou la vente d'un item de la ressource
	    this.AjusterPrix = function() {
			
	        this.prix = Math.round(this.prix + (this.prix * this.coeffAchat));
			this.AjusterPrixVente();
			//on sauvegarde le prix de vente dans un tableau
			this.TablePrix.push(this.prix);
	    }
		
		//Methode - Permet d'ajuster le prix de vente
		this.AjusterPrixVente = function() {
			this.prixVente = Math.round(this.prix - (this.prix * this.coeffVente));
		}

		//Methode - Permet d'acheter un ou n item de la ressource
	    this.AjouterItem = function(quantite) {
			
			for (i = 1; i <= quantite; i++)
			{
				if( gbGainTotal >= this.prix ){
					gbGainTotal -= this.prix;
					this.nombreItem += 1;
					//à chaque ajout, on augmente le prix de vente
					this.AjusterPrix();
				}
				else
					break;
			}
			//on met à jour le gain total par seconde
			this.MajGainTotalParSeconde();
	    }
		
		//Methode - Permet de vendre un item de la ressource
		this.RetirerItem = function() {
			
			//on peut vendre seulement si on a des items
			if( this.nombreItem > 0 ){
				this.nombreItem -= 1;
				//à la vente, on récupère le nombre de prière reçu de la vente et on ajoute au gain total
				gbGainTotal += this.prixVente;
				this.AjusterPrixVente();
				//on retire le prix d'achat 
				this.TablePrix.pop();

				//on récupère le prix d'achat précédent
				if( this.TablePrix.length > 0)
					this.prix = this.TablePrix[this.TablePrix.length - 1];

				this.MajGainTotalParSeconde();
			}
		}
		
		//Methode - Permet de vendre tous les items de la ressource
		this.RetirerToutItem = function() {
			
			var index = this.nombreItem;
			
			for (i = 0; i < index; i++)
			{
				this.RetirerItem();
			}
		}

		//Methode - Permet de connaitre le nombre de prière par seconde
	    this.MajGainTotalParSeconde = function() {
			
	    	this.gainTotalParSeconde = this.nombreItem * this.gainParSeconde;
	    }

		//Methode - Appelé toutes les 100ms pour cumuler la production de prière de la ressource
	    this.RecupererProductionEnCours = function() {
			
			//QUANTUM correspond au coefficient temps pour récupérer le gain correct à chaque appel (ici vaut 10 car appel toutes les 100ms).
			var temp = this.gainTotalParSeconde / QUANTUM;
	    	this.production += temp;
	    	return temp;
	    }
	
		//Mise en place des données dans un fichier JSON - Sauvegarde
		this.ExporterDonnees = function () {
			
			var chaineExport = '{"idt":"' + this.idt + '", "nom":"' + this.nom + '", "icone":"' + this.icone + '", "gain":"' + this.gainParSeconde + '", "nbItem":"' + this.nombreItem + '", "prix":"' + this.prix + '", "production":"' + Math.ceil(this.production) + '", "coeffAchat":"' + this.coeffAchat + '", "coeffVente":"' + this.coeffVente + '"}';

			return chaineExport;
		}
		
		/*****************************************************************************/
		
		//Propriété - Récupère le prix d'achat d'une ressource
		this.getPrix = function() {
			return this.prix;
		}
		//Propriété
		this.getGainParSeconde = function() {
			
			return this.gainParSeconde;
		}
		//Propriété
		this.getNombreItem = function() {
			
			return this.nombreItem;
		}
		//Propriété
		this.getGainTotalParSeconde = function() {
			
			return this.gainTotalParSeconde;
		}
		//Propriété
		this.getProduction = function() {

			return this.production;
		}
	} 

	function Medaille(pIdt, pNom, pIcone, pDescription, pSeuil, pDisponible){
		//attributs
		this.idt = parseInt(pIdt);
	    this.nom = pNom;
		this.icone = pIcone;
		this.description = pDescription;
		this.disponible = pDisponible;
	    this.seuil = parseInt(pSeuil);

	    this.EstDisponible = function(){
			return this.disponible;
	    }

		this.RecupererSeuil = function(){
			return this.seuil;
		}
		
		this.GagnerMedaille = function() {
			this.disponible = 0;
		}
		
		this.RecupererIdentite = function() {
			return this.idt;
		}
	}
	
	function GenererNiveau(){
		var i = 0;

		for (i in Niveaux) {
			var obj = new Niveau(Niveaux[i].idt, Niveaux[i].nom, Niveaux[i].icone, Niveaux[i].gain, Niveaux[i].nbItem, Niveaux[i].prix, Niveaux[i].production, Niveaux[i].coeffAchat, Niveaux[i].coeffVente );
			gbTabProducteur.push(obj);
			$conteneurShop.append("<div class='item' id='item" + i + "'><div class='icone'><img src='images/" + Niveaux[i].icone + "'></div><div class='info'><div class='nom-item'><span>" + Niveaux[i].nom + "</span></div><div class='prix-item'><span id='prixItem'>" + Niveaux[i].prix + "</span></div></div><div class='nb-item'><span id='nbItem'>" + Niveaux[i].nbItem + "</span></div></div>");
		}
	}
	
	function GenererMedaille(){
		var i = 0;

		for (i in Medailles) {
			var obj = new Medaille(Medailles[i].idt, Medailles[i].nom, Medailles[i].icone, Medailles[i].description, Medailles[i].seuil, Medailles[i].disponible );
			gbTabAccomplissement.push(obj);
		}
	}
	
	function AppliquerParametre(premiere_visite){
		var i = 0;
		
		for (i in Params) {
			if( Params[i].NomParametre == 'NomReligion'){
				//On applique le nom de la religion.
				$('#nomReligion').text(Params[i].ValeurParametre);
			}
			else if( Params[i].NomParametre == 'IconeReligion'){
				//On change l'image à cliquer.
				$('#lanceur_clicker').attr('src',"images/" + Params[i].ValeurParametre);
			}
			else if( Params[i].NomParametre == 'NombrePrieres' && premiere_visite ){
				//On applique le nombre de prière cumulé
				$('#compteur_total').text(parseInt(Params[i].ValeurParametre));
				gbGainTotal = parseInt(Params[i].ValeurParametre);
			}
			else if( Params[i].NomParametre == 'FreqMajAuto'){
				clearInterval(tmSauvegarde);
				tmSauvegarde = setInterval(function (){ sauvegarde_auto() }, parseInt(Params[i].ValeurParametre) * UNITETEMPS);
			}
		}
	}
	
	function maj_score() {

		if( gbSingulier ){
			if( gbGainTotal > 1 ){
				gbSingulier = false;
				$('#singulier').html('prières');
			}
		}

		$('#compteur_total').html(Math.round(gbGainTotal));
		$('#compteur_par_seconde').html(gbGainParSeconde);
		
		verifier_medaille();
	}

	function maj_titre() {

		$(document).prop('title', Math.round(gbGainTotal) +  " prières - Religion Clicker");
	}

	function maj_production() {

		gbGainParSeconde = 0;
		for(i=0; i < gbTabProducteur.length; i++){
			var obj = gbTabProducteur[i];
			gbGainTotal += obj.RecupererProductionEnCours();
			gbGainParSeconde += obj.getGainTotalParSeconde();
		}
	}
	
	function sauvegarde_auto() {
		if( connecte == "oui" ){
			sauvegarder();
		}
	}

	function verifier_medaille(){
		
		for(i=0; i < gbTabAccomplissement.length; i++){
			var obj = gbTabAccomplissement[i];
			
			if( obj.EstDisponible() == 1){
				if( gbGainTotal >= obj.RecupererSeuil() ){
					obj.GagnerMedaille();
					sauvegarderMedailleJoueur(obj.RecupererIdentite());
				}
			}
		}		
	}
	
	//sauvegarder les scores
	function sauvegarder() {
		
		//transformation objet vers données json
		var tabDonnees = '[';
		
		for(i=0; i < gbTabProducteur.length; i++){
			var obj = gbTabProducteur[i];
			tabDonnees = tabDonnees + obj.ExporterDonnees() + ',';
		}		
		
		tabDonnees = tabDonnees.substr(0, tabDonnees.length - 1) + ']';
		
		//envoi des données en ajax (scores)
		$.ajax({
			type: "POST",
			url: 'sauvegarde.php',
			data: JSON.stringify(tabDonnees),
			contentType: "application/json; charset=UTF-8", 
			success: function(data){
				;
			}
		});
		
		//sauvegarde du nombre total de prières
		$.ajax({
			type: "POST",
			url: 'sauvegarde_param.php',
			data: 'total=' + $('#compteur_total').text(),
			success: function(data){
				;
			}
		});
	}
		
	//charger la sauvegarde des scores
	function chargerSauvegarde(){
		//mise en place des niveau depuis la sauvegarde
		$.ajax({
			type: "GET",
			url: 'chargement.php',
			cache: false,
			success: function(data){
				Niveaux = JSON.parse(data);
				GenererNiveau();
			}
		});		
	}
	
	//charger les paramètres de l'utilisateur
	function chargerParametre(premiere_visite){
		$.ajax({
			type: "GET",
			url: 'chargement_param.php',
			cache: false,
			success: function(data){
				Params = JSON.parse(data);
				AppliquerParametre(premiere_visite);
			}
		});		
	}

	//charger les accomplissements
	function chargerMedaille(){
		$.ajax({
			type: "GET",
			url: 'chargement_medaille.php',
			cache: false,
			success: function(data){
				Medailles = JSON.parse(data);
				GenererMedaille();
			}
		});		
	}
	
	function afficherMedailleJoueur(){
		$.ajax({
			type: "GET",
			url: 'accomplissement_ajax.php',
			cache: false,
			success: function(data){
				$('#accomplissements').html(data);
			}
		});			
	}
	
	function sauvegarderMedailleJoueur(idtMedaille){
		$.ajax({
			type: "POST",
			url: 'sauvegarde_medaille.php',
			cache: false,
			data: { idt: idtMedaille },
			success: function(data){
				afficherMedailleJoueur();
			}
		});
	}
	
});