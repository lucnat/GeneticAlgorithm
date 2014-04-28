//evolves the population
function evolve(population){

    var tournamentSize = 5;
    var elitism = true;

	    //crossover
	function crossover(i1, i2){	
		var iNew = new Individual(i1.geneLength);
		for(var i=0; i<i1.geneLength; i++){
			iNew.gene[i] = (i1.gene[i] + i2.gene[i])/2;
		}
		return iNew;
	}

	//Select individuals for crossover
	function tournamentSelection(population){
		var tournament = new Population(tournamentSize, false);	// Create a tournament population
		for (var i = 0; i<tournamentSize; i++) {	// For each place in the tournament get a random individual
	        var randomId = parseInt(Math.random()*population.populationSize);
	        tournament.individuals[i] = population.individuals[randomId]
	    }
	    return tournament.getFittest();
	}

    var newPopulation = new Population(population.populationSize, false);

    if (elitism) {
    	newPopulation.individuals[0] = population.getFittest(); //Keep the best individual    	
    }

    // Handle elitism
	var elitismOffset;
	if (elitism) elitismOffset = 1; else elitismOffset = 0;

	//Loop over the population and create new individuals with crossover
	for(var i=elitismOffset; i<population.populationSize; i++){
		var i1 = tournamentSelection(population);
		var i2 = tournamentSelection(population);
		newPopulation.individuals[i] = i1.crossover(i2);
	}

	//Mutate
	for(var i=elitismOffset; i<population.populationSize; i++){
		newPopulation.individuals[i].mutate();
	}

	return newPopulation;
}
