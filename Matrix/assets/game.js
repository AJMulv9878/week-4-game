$(document).ready(function() {

var yourCharacter = "";
var enemy = "";
var playerAttack = "";
var playerHealth = "";
var enemyHealth = "";
var audio = document.createElement('audio');

var matrix = {
	neo: {
		attack: 35,
		hp: 225,
		counter: 20,
		win: "assets/sound/neo-win.mp3",
		lose: "assets/sound/neo-lose.mp3",
		select: "assets/sound/neo-select.mp3"
	},

	smith: {
		attack: 20,
		hp: 250,
		counter: 30,
		win: "assets/sound/smith-win.mp3",
		lose: "assets/sound/smith-lose.mp3",
		select: "assets/sound/smith-select.mp3"
	},

	morpheus: {
		attack: 25,
		hp: 200,
		counter: 35,
		win: "assets/sound/morpheus-win.wav",
		lose: "assets/sound/morpheus-lose.mp3",
		select: "assets/sound/morpheus-select.wav"
	},

	trinity: {
		attack: 40,
		hp: 175,
		counter: 40,
		win: "assets/sound/trinity-win.wav",
		lose: "assets/sound/trinity-lose.wav",
		select: "assets/sound/trinity-select.mp3"
	}
}


$("#neo-hp").html(matrix.neo.hp);
$("#smith-hp").html(matrix.smith.hp);
$("#morpheus-hp").html(matrix.morpheus.hp);
$("#trinity-hp").html(matrix.trinity.hp);


// Portrait click function to select character and enemy
$(".character").on("click", function() {
	var chosen = this.value;

	// Character Conditional
	if (yourCharacter == "") {
		yourCharacter = chosen;
		playerAttack = matrix[yourCharacter].attack;
		playerHealth = matrix[yourCharacter].hp;
		audio.src = matrix[yourCharacter].select;
		audio.play();
		$("#choose-character").html("YOUR CHARACTER");

		if (yourCharacter == "neo") {
			$("#resetSmith").css("background-color", "black", "opacity", "1").appendTo(".defender1");
			$("#resetMorpheus").css("background-color", "black", "opacity", "1").appendTo(".defender2");
			$("#resetTrinity").css("background-color", "black", "opacity", "1").appendTo(".defender3");
		}

		else if (yourCharacter == "smith") {
			$("#resetNeo").css("background-color", "black", "opacity", "1").appendTo(".defender1");
			$("#resetMorpheus").css("background-color", "black", "opacity", "1").appendTo(".defender2");
			$("#resetTrinity").css("background-color", "black", "opacity", "1").appendTo(".defender3");
			$("#smith").contents().appendTo("#neo");
		}

		else if (yourCharacter == "morpheus") {
			$("#resetNeo").css("background-color", "black", "opacity", "1").appendTo(".defender1");
			$("#resetSmith").css("background-color", "black", "opacity", "1").appendTo(".defender2");
			$("#resetTrinity").css("background-color", "black", "opacity", "1").appendTo(".defender3");
			$("#morpheus").contents().appendTo("#neo");
		}

		else if (yourCharacter == "trinity") {
			$("#resetNeo").css("background-color", "black", "opacity", "1").appendTo(".defender1");
			$("#resetSmith").css("background-color", "black", "opacity", "1").appendTo(".defender2");
			$("#resetMorpheus").css("background-color", "black", "opacity", "1").appendTo(".defender3");
			$("#trinity").contents().appendTo("#neo");
		}
	}

	// Enemy Conditional
	else if (enemy == ""  && matrix[chosen].hp > 0) {
		enemy = chosen;
		enemyHealth = matrix[enemy].hp;
		$("#choose-enemy").html("YOUR ENEMY");

		if (enemy == "neo"){
			$(".defender1").contents().appendTo("#enemy");
			$("#resetNeo").css("background-color", "red", "opacity", "1");
		}

		else if (enemy == "smith") {
			$("#resetSmith").css("background-color", "red", "opacity", "1");
			if (yourCharacter == "neo") {
				$(".defender1").contents().appendTo("#enemy");
			}
			else {
				$(".defender2").contents().appendTo("#enemy");
			}
		}

		else if (enemy == "morpheus") {
			$("#resetMorpheus").css("background-color", "red", "opacity", "1");
			if (yourCharacter == "trinity") {
				$(".defender3").contents().appendTo("#enemy");
			}
			else {
				$(".defender2").contents().appendTo("#enemy");
			}
		}

		else if (enemy == "trinity") {
			$("#resetTrinity").css("background-color", "red", "opacity", "1");
			$(".defender3").contents().appendTo("#enemy");
		}
	}
});

// Attack button functionality
$("#attack").on("click", function() {

	if (enemy == "") {}

	else {
		if (playerHealth > 0 && enemyHealth > 0) {
			enemyHealth = enemyHealth - playerAttack;
			playerHealth = playerHealth - matrix[enemy].counter;
			if (playerHealth < 100) {

			}
			$("#attack-stats").html("YOU ATTACKED FOR " + playerAttack +". THEY COUNTERED WITH " + matrix[enemy].counter + ".");
			playerAttack = playerAttack + matrix[yourCharacter].attack;

			// Reprint Player HP
			if (yourCharacter == "neo") {
				$("#neo-hp").html(playerHealth);
			}

			else if (yourCharacter == "smith") {
				$("#smith-hp").html(playerHealth);
			}

			else if (yourCharacter == "morpheus") {
				$("#morpheus-hp").html(playerHealth);
			}

			else if (yourCharacter == "trinity") {
				$("#trinity-hp").html(playerHealth);
			}

			// Reprint Enemy HP
			if (enemy == "neo") {
				$("#neo-hp").html(enemyHealth);
			}

			else if (enemy == "smith") {
				$("#smith-hp").html(enemyHealth);
			}

			else if (enemy == "morpheus") {
				$("#morpheus-hp").html(enemyHealth);
			}

			else if (enemy == "trinity") {
				$("#trinity-hp").html(enemyHealth);
			}

		}

		else if (playerHealth <= 0) {
			$("#attack-stats").html("YOU LOSE!");
			audio.src = matrix[yourCharacter].lose;
			audio.play();
		}

		else if (enemyHealth <= 0) {
			$("#enemy").contents().hide();
			$("#attack-stats").html("YOU WIN!");
			audio.src = matrix[yourCharacter].win;
			audio.play();
			enemy = "";
					}
	}

});

$("#reset").on("click", function() {
	$("#resetNeo").show().css("background-color", "rgba(0, 0, 0, 0)").appendTo("#neo");
	$("#resetSmith").show().css("background-color", "rgba(0, 0, 0, 0)").appendTo("#smith");
	$("#resetMorpheus").show().css("background-color", "rgba(0, 0, 0, 0)").appendTo("#morpheus");
	$("#resetTrinity").show().css("background-color", "rgba(0, 0, 0, 0)").appendTo("#trinity");
	$("#neo-hp").html(matrix.neo.hp);
	$("#smith-hp").html(matrix.smith.hp);
	$("#morpheus-hp").html(matrix.morpheus.hp);
	$("#trinity-hp").html(matrix.trinity.hp);
	$("#choose-character").html("CHOOSE YOUR CHARACTER");
	$("#choose-enemy").html("CHOOSE YOUR ENEMY");
	enemy = "";
	yourCharacter = "";

});



});