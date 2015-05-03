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

	//mise en place des niveau
    $.ajax({
		type: "GET",
		url: 'chargement.php',
		cache: false,
		success: function(data){
			Niveaux = JSON.parse(data);
			GenererNiveau();
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
	//classe Niveau
	function Niveau(pNom, pIcone, pGainParSeconde, pNbItem, pPrix, pProduction, pCoeffAchat, pCoeffVente){
		
	    this.nom = pNom;
		this.icone = pIcone;
	    this.gainParSeconde = pGainParSeconde;
		this.nombreItem = pNbItem;
	    this.prix = pPrix;
		this.production = pProduction;
	    this.coeffAchat = pCoeffAchat;
	    this.coeffVente = pCoeffVente;	    
		this.prixVente = (this.prix * this.coeffVente);
		this.gainTotalParSeconde = this.nombreItem * this.gainParSeconde;

		this.TablePrix = [pPrix];

	    this.AjouterGainParSeconde = function(type, valeur) {
			
	        if( type == 'unitaire')
	        	this.gainParSeconde = this.gainParSeconde + valeur;
	        else if ( type == 'multiple' )
	        	this.gainParSeconde = this.gainParSeconde * valeur;
	        else if ( type == 'pourcentage')
	        	this.gainParSeconde = this.gainParSeconde + ((this.gainParSeconde * valeur) / 100);

	        this.MajGainTotalParSeconde();
	    } 

	    this.AjusterPrix = function() {
			
	        this.prix = Math.round(this.prix + (this.prix * this.coeffAchat));
			this.AjusterPrixVente();
			this.TablePrix.push(this.prix);
	    }
		
		this.AjusterPrixVente = function() {
			this.prixVente = Math.round(this.prix - (this.prix * this.coeffVente));
		}

	    this.AjouterItem = function(quantite) {
			
			for (i = 1; i <= quantite; i++)
			{
				if( gbGainTotal >= this.prix ){
					gbGainTotal -= this.prix;
					this.nombreItem += 1;
					this.AjusterPrix();
				}
				else
					break;
			}
			this.MajGainTotalParSeconde();
	    }
		
		this.RetirerItem = function() {
			
			//on peut vendre seulement si on a des items
			if( this.nombreItem > 0 ){
				this.nombreItem -= 1;
				gbGainTotal += this.prixVente;
				this.AjusterPrixVente();
				this.TablePrix.pop();

				if( this.TablePrix.length > 0)
					this.prix = this.TablePrix[this.TablePrix.length - 1];

				this.MajGainTotalParSeconde();
			}
		}
		
		this.RetirerToutItem = function() {
			
			var index = this.nombreItem;
			
			for (i = 0; i < index; i++)
			{
				this.RetirerItem();
			}
		
		}

	    this.MajGainTotalParSeconde = function() {
			
	    	this.gainTotalParSeconde = this.nombreItem * this.gainParSeconde;
	    }

	    this.RecupererProductionEnCours = function() {
			
			var temp = this.gainTotalParSeconde / QUANTUM;
	    	this.production += temp;
	    	return temp;
	    }
	
		this.ExporterDonnees = function () {
			
			var chaineExport = '{"nom":"' + this.nom + '", "icone":"' + this.icone + '", "gain":"' + this.gainParSeconde + '", "nbItem":"' + this.nombreItem + '", "prix":"' + this.prix + '", "production":"' + this.production + '", "coeffAchat":"' + this.coeffAchat + '", "coeffVente":"' + this.coeffVente + '"}';

			return chaineExport;
		}
		
		this.getPrix = function() {
			return this.prix;
		}
		
		this.getGainParSeconde = function() {
			
			return this.gainParSeconde;
		}
		
		this.getNombreItem = function() {
			
			return this.nombreItem;
		}
		
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