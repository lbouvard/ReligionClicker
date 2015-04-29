$(document).ready(function() {
	
	//Init des variable
	var gbGainTotal = 0;
	var gbGainParSeconde = 0;
	var gbTabProducteur = new Array();
	var gbSingulier = true;
	var QUANTUM = 10;

	//mise à jour du compteur
	setInterval(function (){ maj_score() }, 1);
	//parcours des producteurs
	setInterval(function (){ maj_production() }, 100);
	//mise en place des niveau
	GenererNiveau();

	//verification des achats possible


	/*************************************
	**
	**	FONCTIONS
	**
	**************************************/
	//classe Niveau
	function Niveau(pNom, pGainParSeconde, pNbItem, pPrix, pProduction, pCoeffAchat, pCoeffVente){
		
	    this.nom = pNom; 
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

		//pNom, pGainParSeconde, pNbItem, pPrix, pProduction, pCoeffAchat, pCoeffVente
		var obj = new Niveau("Adepte", 1, 0, 5, 0, 0.4, 0.6);
		gbTabProducteur.push(obj);
		$('#Niveau1Items').html(obj.getNombreItem());
		$('#Niveau1PrixItem').html(obj.getPrix());

		obj = new Niveau("Prêtre", 10, 0, 50, 0, 0.5, 0.7);
		gbTabProducteur.push(obj);
		$('#Niveau2Items').html(obj.getNombreItem());
		$('#Niveau2PrixItem').html(obj.getPrix());

		obj = new Niveau("Evêque", 100, 0, 200, 0, 0.5, 0.8);
		gbTabProducteur.push(obj);
		$('#Niveau3Items').html(obj.getNombreItem());
		$('#Niveau3PrixItem').html(obj.getPrix());
	}

	//ajout de prière par clic
	$('#lanceur_clicker').on( 'click', function(){
		gbGainTotal++;
	});

	//Achat d'un item
	$('#Niveau1').on( 'click', function() {

		//on récupère le niveau dans le tableau
		var obj = gbTabProducteur[0];
		obj.AjouterItem(1);
		$('#Niveau1Items').html(obj.getNombreItem());
		$('#Niveau1PrixItem').html(obj.getPrix());

	});

	//Achat d'un item
	$('#Niveau2').on( 'click', function() {

		//on récupère le niveau dans le tableau
		var obj = gbTabProducteur[1];
		obj.AjouterItem(1);
		$('#Niveau2Items').html(obj.getNombreItem());
		$('#Niveau2PrixItem').html(obj.getPrix());

	});

	//Achat d'un item
	$('#Niveau3').on( 'click', function() {

		//on récupère le niveau dans le tableau
		var obj = gbTabProducteur[2];
		obj.AjouterItem(1);
		$('#Niveau3Items').html(obj.getNombreItem());
		$('#Niveau3PrixItem').html(obj.getPrix());

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

	function maj_production() {

		gbGainParSeconde = 0;
		for(i=0; i < gbTabProducteur.length; i++){
			var obj = gbTabProducteur[i];
			gbGainTotal += obj.RecupererProductionEnCours();
			gbGainParSeconde += obj.getGainTotalParSeconde();
		}
	}

});