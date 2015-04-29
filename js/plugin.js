$(document).ready(function() {
	
	//Init des variable
	var gbGainTotal = 0
	//mise à jour du compteur
	setInterval(function (){ maj_score() }, 100);

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

	    this.AjouterGainParSeconde = function(type, valeur) {
			
	        if( type == 'unitaire')
	        	this.gainParSeconde = this.gainParSeconde + valeur;
	        else if ( type == 'multiple' )
	        	this.gainParSeconde = this.gainParSeconde * valeur;
	        else if ( type == 'pourcentage')
	        	this.gainParSeconde = this.gainParSeconde + ((this.gainParSeconde * valeur) / 100);

	        MettreAJourRatio();
	    } 

	    this.AjusterPrix = function() {
			
	        this.prix = Math.round(this.prix + (this.prix * coeffAchat));
			AjusterPrixVente();
	    }
		
		this.AjusterPrixVente = function() {
			this.prixVente = Math.round(this.prix - (this.prix * this.coeffVente));
		}

	    this.AjouterItem = function(quantite) {
			
			for (i = 1; i <= quantite; i++)
			{
				if( gbGainTotal >= this.prix ){
					this.nombreItem += 1;
					AjusterPrix();
				}
				else
					break;
			}
	    }
		
		this.RetirerItem = function() {
			
			this.nombreItem -= 1;
			gdGainTotal += this.prixVente;
			AjusterPrixVente();
		}
		
		this.RetirerToutItem = function() {
			
			var index = this.nombreItem;
			
			for (i = 0; i < index; i++)
			{
				RetirerItem();
			}			
		}

	    this.MajGainTotalParSeconde = function() {
			
	    	this.gainTotalParSeconde = this.nombreItem * this.gainParSeconde;
	    }

	    this.RecupererProductionEnCours = function() {
			
	    	this.production += this.gainTotalParSeconde;
	    	return this.gainTotalParSeconde;
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

	$('#lanceur_clicker').on( 'click', function(){
		gbGainTotal++;
	});

	function maj_score()
	{
		$('#compteur_total').html(gbGainTotal + " prières");
	}

});