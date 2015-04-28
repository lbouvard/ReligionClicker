$(document).ready(function() {
	
	//Init des variable
	var compteur = 0
	setInterval(function (){ maj_score() }, 100);

	//classe robot
	function RobotClicker(nomRobot, incrementRobot, prixRobot, compteur) { 
	    
	    this.nom = nomRobot; 
	    this.increment = incrementRobot;
	    this.prixAchat = prixRobot;
		this.compteur = compteur;
	    this.nbInstance = 0;
	    this.coefPrixAchat = 1;
	    this.coefPrixVente = 0.6;
	    this.prixVente = (this.prixAchat * this.coefPrixVente); 
	    this.ratio = this.nbInstance * this.increment;

	     
	    this.AugmenterIncrement = function(type, valeur) 
	    { 
	        if( type == 'unitaire')
	        	this.increment += valeur;
	        else if ( type == 'multiple' )
	        	this.increment *= valeur;
	        else if ( type == 'pourcentage')
	        	this.increment += (this.increment * valeur) / 100;
	        else
	        	;

	        MettreAJourRatio();
	    } 

	    this.AugmenterPrix = function(coeff) 
	    { 
	        this.prixAchat += this.prixAchat * coeff;
	    }

	    this.AjouterRobot = function(nbAAjouter) 
	    { 
	        this.nbInstance += nbAAjouter;

	    }

	    this.MettreAJourRatio = function()
	    {
	    	this.ratio = this.nbInstance * this.increment;
	    }

	    this.RecupererGain = function()
	    {
	    	this.compteur += this.ratio;

	    	return this.ratio;
	    }

	    this.VendreRobot = function(nbAVendre)
	    {
	    	this.nbInstance -= nbAVendre;
	    	MettreAJourRatio();

	    	this.prixVente = (this.prixAchat * this.coefPrixVente); 
	    	return this.prixVente;
	    }

	} 


	$('#lanceur_clicker').on( 'click', function(){
		compteur++;
	});

	function maj_score()
	{
		$('#compteur_total').html(compteur + " prières");
	}

});