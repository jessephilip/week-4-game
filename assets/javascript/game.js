//todo: create ways to undo playerChoice and opponentChoice selections before fights begin
//todo: implement reset button
//todo: implement sounds
//todo: implement animations
//todo: implement random sayings
//todo: implement improved graphics mode

var characters = {
	python: {
		name: "Python",
		hp: 300,
		attack: 20,
		counter: 25,
		image: "assets/images/python.png",
		icon: '<i class="icon-python"></i>',
		sayings: ['', '', ''],	
		description: 'Python is the "v2/v3" double barrel shotgun, only one barrel will shoot at a time, and you never end up shooting the recommended one. Also I probably should have used a line tool to draw that.'
	},

	javascript: {
		name: "Javascript",
		hp: 275,
		attack: 30,
		counter: 35,
		image: "assets/images/javascript.png",
		icon: '<i class="icon-javascript"></i>',
		sayings: ['console.alert("!!!ATTACK!!!");', 'prompt("Do you wish to DIE?!!!");', 'selfBuff+++++++;', 'document.write("All your HTML will be mine!");'],		
		description: 'JavaScript is a sword without a hilt.'
	},

	php: {
		name: "Php",
		hp: 250,
		attack: 15,
		counter: 20,
		image: "assets/images/php.png",
		icon: '<i class="icon-php"></i>',
		sayings: ['echo "Suck it!";', 'print "DIEEEEEEEEEEEE";', '$myCan = fopen("canOfWhoopAss.txt", "w")'],
		description: 'PHP is a hose, you usually plug one end into a car exhaust, and the other you stick in through a window and then you sit in the car and turn the engine on.'
	},

	ruby: {
		name: "Ruby",
		hp: 260,
		attack: 25,
		counter: 30,
		image: "assets/images/ruby.png",
		icon: '<i class="icon-ruby"></i>',
		sayings: ['', '', ''],	
		description: 'Ruby is a ruby encrusted sword, it is usually only used because of how shiny it is.'
	}
}

// necessary global variables
// boolean regarding whether the player has chosen a character
var playerCharacterChosen = false;
var opponentChosen = false;

// var to contain the character of the player's choice
var playerCharacter;

// var to contain the character of the player's choice
var opponentCharacter;

// integer to track which step the program is on
var clickCounter = 0;

// integer to store the beginning attack value of playerCharacter
var baseAttackStat;
var playerHPStat;
var playerAttackStat;

var opponentHPStat;
var opponentCounterStat;

//global variable to track defeated opponents
var defeatedOpponents = 0;

//boolean variable regarding win/lose status
var gameOver = false;


$(document).ready(function () {
	
	// start game with four characters from object
	startGame(characters.python, characters.ruby, characters.javascript, characters.php);

	//click on character box. if this is the first click that character becomes the player's character
	$(".characterBox").on("click", function() {
		
		// player chooses a player character
		if (clickCounter == 1) {
			setPlayerCharacter(this);

		}
		
		// player chooses opponent
		else if (clickCounter == 2) setOpponent(this);

	});

	$("#fightButton").on("click", function () {
		if (opponentChosen) fight();

		//if (gameOver) reset();
		//else fight();
	});	
	
});

// function to create player tile
function createCharacter (character) {

var name = character.name;
var hp = character.hp;
var attack = character.attack;
var counter = character.counter;
var image = character.image;
var icon = character.icon;

//console.log("Name: " + name + ", HP: " + hp + ", Attack: " + attack + ", Counter: " + counter);

	// locations to append 
	var mainArea = $("#mainArea");
	var profileRow = $("#profileRow");
	var chosenFighterArea = $("#chosenFighterArea");
	var chosenOpponentArea = $("#chosenOpponentArea");
	var yourCharacterRow = $("#yourCharacterRow");

	// create elements of character box
	// box to contain a header row, middle content section, two aside columns and a footer

	//different characterbox
	var characterBox = $("<section>");
	characterBox.attr("id", name.toLowerCase() + "CharacterBox");
	characterBox.attr("class", "characterBox hvr-float-shadow");
	characterBox.val(name.toLowerCase());

	var nameH2 = $("<h2>");
	nameH2.attr("id", name.toLowerCase() + "Name");
	nameH2.attr("class", "nameText");
	nameH2.html(name);

	var characterIcon = $("<h2>");
	characterIcon.html(icon);

	var hpH2 = $("<h2>");	
	hpH2.attr("id", name.toLowerCase() + "HP");
	hpH2.attr("class", "hpText");
	hpH2.text(hp);

	// append text elements to proper division
	characterBox.append(nameH2);
	characterBox.append(characterIcon);
	characterBox.append(hpH2);

	// append elements to page and elements to box
	if (clickCounter == 0) profileRow.append(characterBox);

	if (clickCounter == 1) {
	//console.log("set player CharacterBox");
		
		//detach selected box and put it in the Character Row
		$("#chooseText").css("display", "none");
		$("#" + name.toLowerCase() + "CharacterBox").detach();
		yourCharacterRow.append(characterBox);

		profileRow.find('.characterBox').appendTo("#enemiesRow");
		profileRow.find('.characterBox').detach();

		$("#enemiesRow").find(".characterBox").css("border", "5px solid red");
	}

	if (clickCounter == 2) {
	//console.log("set opponent CharacterBox " + name);
		$("#defenderSection").append(characterBox);
		$("#defenderSection").find(".characterBox").css("border", "5px solid purple");
	}

}

// generates a random rgb(x,y,z) color
function randomColor() {
	return "rgb(" + (Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")");
}

// functionality not implemented yet
function randomWord(character) {
	console.log(character.sayings);
	return character.sayings[Math.floor(Math.random() * character.sayings.length)];
}

//takes in four characters for a basic four character start game
function startGame(character1, character2, character3, character4) {
	for (var i = 0; i < arguments.length; i++) {
		createCharacter(arguments[i]);
	}

	clickCounter++;  
}

function setPlayerCharacter(character) {
	
	//$("#" + character.id).detach();

	playerCharacter = characters[character.value];
	//console.log(playerCharacter);		
	createCharacter(playerCharacter);
	
	clickCounter++;
	//console.log(clickCounter);

	baseAttack = playerCharacter.attack;
	playerHPStat = playerCharacter.hp;
	playerAttackStat = playerCharacter.attack;

	//$(".characterBox").css("border", "5px solid red");
	$(character).css("border", "5px solid green");

}

function setOpponent(character) {
	
	if (!opponentChosen) {
		$("#" + character.id).detach();
		opponentCharacter = characters[character.value];
	
		createCharacter(opponentCharacter);
		opponentChosen = true;

		opponentHPStat = opponentCharacter.hp;
		opponentCounterStat = opponentCharacter.counter;

	}
}

function fight() {

	//console.log("player: " + playerCharacter.description);
	//console.log("opponent: " + opponentCharacter.description);

	// locators
	playerHP = $("#" + playerCharacter.name.toLowerCase() + "HP");
	playerAttack = $("#" + playerCharacter.name.toLowerCase() + "Attack");
	opponentHP = $("#" + opponentCharacter.name.toLowerCase() + "HP");

	// calculations
	playerHPStat -= opponentCounterStat;
	opponentHPStat -= playerAttackStat;
	playerAttackStat += baseAttack;

	// update visuals
	playerHP.text(playerHPStat);
	playerAttack.text(playerAttackStat);
	opponentHP.text(opponentHPStat);

	// get input random word. functionality not present yet
	randomWord(playerCharacter);
	randomWord(opponentCharacter);

	if (opponentHPStat <= 0) {
		$("#" + opponentCharacter.name.toLowerCase() + "CharacterBox").detach();
		//alert("You defeated " + opponentCharacter.name);
		opponentChosen = false;
		console.log(opponentCharacter.hp);
		
		//increment defeated opponents
		defeatedOpponents++;
	}

	if (playerHPStat <= 0) {
		$("#" + playerCharacter.name.toLowerCase() + "CharacterBox").detach();
		alert("You Lose.");
		//console.log(playerCharacter.hp);

		// get reset functionality to work
		//$("#fightButton").text("Play Again?");
		//$("#fightButton").removeClass("btn-danger");
		//$("#fightButton").addClass("btn-success");

		gameOver = true;
		
	}

	if (!gameOver && defeatedOpponents == 3) {
		alert("You Win!!!");
		
		// get reset functionality to work
		//$("#fightButton").text("Play Again?");
		//$("#fightButton").removeClass("btn-danger");
		//$("#fightButton").addClass("btn-success");
		gameOver = true;
	}


}

// get reset functionality to work
function reset() {
	//console.log("reset reached");
	$(".characterBox").detach();
	
	// reset variables tracking counts and statuses
	clickCounter = 0;
	playerCharacter = "";
	opponentCharacter = "";
	status = false;

	// reset booleans
	playerCharacterChosen = false;
	opponentChosen = false;

	// reset the number of opponents defeated
	defeatedOpponents = 0;

	// reset values for damage and health
	baseAttack = 0;
	playerHPStat = 0;
	playerAttackStat = 0;
	opponentHPStat = 0;
	opponentCounterStat = 0;

	//set display back to beginning state
	$("#chooseText").css("display", "block");

	// change fight button to play again button
	$("#fightButton").text("Fight");
	$("#fightButton").removeClass("btn-success");
	$("#fightButton").addClass("btn-danger");	

	startGame(characters.python, characters.ruby, characters.javascript, characters.php);
}