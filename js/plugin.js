$(document).ready(function() {
	
	//Init des variable
	var gbGainTotal = 0;
	var gbGainParSeconde = 0;
	var gbTabProducteur = new Array();
	var gbSingulier = true;
	var QUANTUM = 10;
	var Niveaux;

	var $conteneurShop = $('#shop');

	//mise à jour du compteur
	setInterval(function (){ maj_score() }, 1);
	//parcours des producteurs
	setInterval(function (){ maj_production() }, 100);
	setInterval(function (){ maj_titre() }, 2000);

	//chargement de la fenêtre de connexion
    $.ajax({
		type: "GET",
		url: 'connexion.php',
		cache: false,
		success: function(data){
			$('#bloc_central').html(data);
		}
    });


	//verification des achats possible


	/************************************
	**
	**	TIMER
	**
	************************************/
	//mise à jour du compteur
	setInterval(function (){ maj_score() }, 1);
	//parcours des producteurs
	setInterval(function (){ maj_production() }, 100);
	setInterval(function (){ maj_titre() }, 2000);

	/*************************************
	**
	**	FONCTIONS
	**
	**************************************/
	
	/**************************************************************
	*	Classe 		: Niveau
	*	Auteur		: Bouvard Laurent
	*	Date		: 05/05/2015
	*	Description : Classe qui permet de gérer une ressource. 
	*	Une ressource contient un prix d'achat et un prix de vente
	*	qui évolue à chaque achat/vente. Ces prix sont calculé par 
	*	des coefficients fixes.
	****************************************************************/
	function Niveau(pNom, pIcone, pGainParSeconde, pNbItem, pPrix, pProduction, pCoeffAchat, pCoeffVente){
		
		//attributs
	    this.nom = pNom;
		this.icone = pIcone;
	    this.gainParSeconde = pGainParSeconde;
		this.nombreItem = pNbItem;
	    this.prix = pPrix;
		this.production = pProduction;
	    this.coeffAchat = pCoeffAchat;
	    this.coeffVente = pCoeffVente;	    
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
			
			var chaineExport = '{"nom":"' + this.nom + '", "icone":"' + this.icone + '", "gain":"' + this.gainParSeconde + '", "nbItem":"' + this.nombreItem + '", "prix":"' + this.prix + '", "production":"' + this.production + '", "coeffAchat":"' + this.coeffAchat + '", "coeffVente":"' + this.coeffVente + '"}';

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
	} 

	function GenererNiveau(){
		var i = 0;

		for (i in Niveaux) {
			var obj = new Niveau(Niveaux[i].nom, Niveaux[i].icone, Niveaux[i].gain, Niveaux[i].nbItem, Niveaux[i].prix, Niveaux[i].production, Niveaux[i].coeffAchat, Niveaux[i].coeffVente );
			gbTabProducteur.push(obj);
			$conteneurShop.append("<div class='item' id='item" + i + "'><div class='icone'><img src='images/" + Niveaux[i].icone + "'></div><div class='info'><div class='nom-item'><span>" + Niveaux[i].nom + "</span></div><div class='prix-item'><span id='prixItem'>" + Niveaux[i].prix + "</span></div></div><div class='nb-item'><span id='nbItem'>" + Niveaux[i].nbItem + "</span></div></div>");
		}
	}

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
	
	//connexion
	$(document).on( 'click', '#connexion', function(){
		$.ajax({
			type: "POST",
			url: 'connexion.php',
			data: { login: $('#login').val(), pass: $('#pass').val() },
			success: function(data){
				$('#bloc_central').html(data);
			}
		});

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
	});

	//deconnexion
	$(document).on( 'click', '#deconnexion', function(){
		$.ajax({
			type: "POST",
			url: 'deconnexion.php',
			success: function(data){
				$('#bloc_central').html(data);
			}
		});
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

	//Annuler l'inscription
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
			type: "POST",
			url: 'parametre.php',
			success: function(data){
				$('#bloc_central').html(data);
			}
		});
	});

	//validation des parametres
	$(document).on( 'click', '#val_parametre', function(){
		
		var data = new FormData($('#donnees_parametre')[0]);
		//data.append('file', icone);

		$.ajax({
			type: "POST",
			url: 'parametre.php',
			//data: { nomrel: $('#nomrel').val(), icone: $('#icone').val() },
			data: data,
			processData: false,
			contentType: false,
			success: function(data){
				$('#bloc_central').html(data);

				//On change l'image
				$('#lanceur_clicker').attr('src',"images/" + icone);
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

	$('#boutonsave').on( 'click', function() {
			sauvegarder();
	});
	
	function maj_score() {

		if( gbSingulier ){
			if( gbGainTotal > 1 ){
				gbSingulier = false;
				$('#singulier').html('prières');
			}
		}

		$('#compteur_total').html(Math.round(gbGainTotal));
		$('#compteur_par_seconde').html(gbGainParSeconde);
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
	
	function sauvegarder() {
		
		//transformation objet vers données json
		var tabDonnees = '[';
		
		for(i=0; i < gbTabProducteur.length; i++){
			var obj = gbTabProducteur[i];
			tabDonnees = tabDonnees + obj.ExporterDonnees() + ',';
		}		
		
		tabDonnees = tabDonnees.substr(0, tabDonnees.length - 1) + ']';
		
		//envoi des données en ajax
		
		//test
		/*$.post(
			"sauvegarde.php", 
			{json: JSON.stringify(tabDonnees), type:"partie", user:"1"},
			function(data){
				;
			},
			"json"
		);*/
		
		$.ajax({
			type: "POST",
			url: 'sauvegarde.php',
			data: JSON.stringify(tabDonnees),
			contentType: "application/json; charset=UTF-8", 
			success: function(data){
				;
			}
		});
	}
});