class Population {

	constructor(populationSize, initialise) {
		var geneLength = 64;
		this.solution = [0.758413580711931, 0.5579331207554787, 0.12680716020986438, 0.18179089506156743, 0.6639191850554198, 0.6765133002772927, 0.8406072347424924, 0.5946606087964028, 0.27873781975358725, 0.44111811183393, 0.5964804789982736, 0.3473912242334336, 0.870132505428046, 0.02704831026494503, 0.31848905398510396, 0.6189980290364474, 0.8572040714789182, 0.660154951037839, 0.9953351367730647, 0.8639541405718774, 0.28405297663994133, 0.5469197873026133, 0.6837171402294189, 0.6916721002198756, 0.9970407653599977, 0.1010195363778621, 0.09191228728741407, 0.3842341478448361, 0.08905429602600634, 0.32314611901529133, 0.6775571645703167, 0.9844497691374272, 0.788588146911934, 0.8911844452377409, 0.6481575276702642, 0.8492630990222096, 0.679882746655494, 0.5123725093435496, 0.5368932713754475, 0.5601124875247478, 0.936848915880546, 0.10423958534374833, 0.9069608352147043, 0.761201208923012, 0.6595857255160809, 0.6520859950687736, 0.7212463044561446, 0.34885338926687837, 0.6720247301273048, 0.7785563201177865, 0.6168030616827309, 0.8348535266704857, 0.18259361805394292, 0.6389996183570474, 0.35739117697812617, 0.5116133270785213, 0.7846048399806023, 0.986322701908648, 0.11376066412776709, 0.9068313059397042, 0.5332716405391693, 0.5888447421602905, 0.961161786923185, 0.2786520696245134];
		this.populationSize = populationSize;
		this.individuals = [];
		if(initialise){	//initialise population:
			for(var i=0; i<populationSize; i++){
				this.individuals[i] = new Individual(geneLength);
				this.individuals[i].fitness = this.individuals[i].getFitness();
			}
		}
	}

	getFittest() {
		var fittest = this.individuals[0];
		for(var i=0; i<this.populationSize; i++)
			if(this.individuals[i].getFitness() > fittest.getFitness()){
				fittest = this.individuals[i];
			}
		return fittest;
	}

	toString(){
		var populationString = "";
		for(var i=0; i<this.populationSize; i++)
			populationString += this.individuals[i] + " \n"
		populationString += "Fittest: " + this.getFittest(this.population).getFitness();
		return populationString;
	}

	getLabels() {
		var labels = [];
		for(var i=0; i<geneLength; i++)
			labels[i] = "Gene "+(i+1)
		return labels;
	}
}

class Individual {

	constructor(geneLength) {
		this.geneLength = geneLength;
		this.gene = []
		this.fitness = 0;
		
		for(var i=0; i<this.geneLength; i++){
			this.gene[i] = Math.random();
		}
	}


	getFitness(solution) {	
		var solution = [0.758413580711931, 0.5579331207554787, 0.12680716020986438, 0.18179089506156743, 0.6639191850554198, 0.6765133002772927, 0.8406072347424924, 0.5946606087964028, 0.27873781975358725, 0.44111811183393, 0.5964804789982736, 0.3473912242334336, 0.870132505428046, 0.02704831026494503, 0.31848905398510396, 0.6189980290364474, 0.8572040714789182, 0.660154951037839, 0.9953351367730647, 0.8639541405718774, 0.28405297663994133, 0.5469197873026133, 0.6837171402294189, 0.6916721002198756, 0.9970407653599977, 0.1010195363778621, 0.09191228728741407, 0.3842341478448361, 0.08905429602600634, 0.32314611901529133, 0.6775571645703167, 0.9844497691374272, 0.788588146911934, 0.8911844452377409, 0.6481575276702642, 0.8492630990222096, 0.679882746655494, 0.5123725093435496, 0.5368932713754475, 0.5601124875247478, 0.936848915880546, 0.10423958534374833, 0.9069608352147043, 0.761201208923012, 0.6595857255160809, 0.6520859950687736, 0.7212463044561446, 0.34885338926687837, 0.6720247301273048, 0.7785563201177865, 0.6168030616827309, 0.8348535266704857, 0.18259361805394292, 0.6389996183570474, 0.35739117697812617, 0.5116133270785213, 0.7846048399806023, 0.986322701908648, 0.11376066412776709, 0.9068313059397042, 0.5332716405391693, 0.5888447421602905, 0.961161786923185, 0.2786520696245134];
		var fitness = this.geneLength;;
		for(var i=0; i<this.geneLength; i++){
			fitness -= Math.abs(this.gene[i]-solution[i]);
		}
		return fitness;
	}

	mutate() {	
    	var mutationRate = 0.015;
		for(var i=0; i<this.geneLength; i++){
			if(Math.random() <= mutationRate){
				this.gene[i] += (Math.random()-0.5)/5;
			}
		}
	}

	crossover(other) {
		var iNew = new Individual(this.geneLength);
		for(var i=0; i<this.geneLength; i++){
			iNew.gene[i] = (this.gene[i] + other.gene[i])/2;
		}
		return iNew;
	}

	toString() {
		var geneString = "";
    	for (var i=0; i<this.gene.length; i++) {
            geneString += this.gene[i] + " ";
        }
        geneString += " | fitness: " + this.getFitness();

        return geneString;
	}
}

function evolve(population){
	//evolves the population by one step (replaces all individuals once)

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


var population = {}
var	population = new Population(50, true);

setInterval(function() {
	population = evolve(population);
	var fittest = population.getFittest();
	console.log("Fittest: " +fittest.getFitness());
}, 10);	
