$(document).ready(function() {

	const dealerCards = $('.dealercards');

	const winnerDisplay = $('.winnerdisplay');
	const winner = $('.winnerdisplay__winner');

	const playerCards = $('.playercards');
	const playerHit = $('.playerhand__hit');
	const playerStand = $('.playerhand__stand');

	let playerPointsDiv = $('.playerpoints');
	let dealerPointsDiv = $('.dealerpoints');

	let bet = 5000;

	let playerPoints = 0;
	let dealerPoints = 0;

	let pointsHiddenCard;
	let dealerHiddenCard;

	let check = 0;

	let cards = {
		2: ['2C', '2D', '2H', '2S'],
		3: ['3C', '3D', '3H', '3S'],
		4: ['4C', '4D',	'4H', '4S'],
		5: ['5C', '5D', '5H', '5S'],
		6: ['6C', '6D', '6H', '6S'],
		7: ['7C', '7D', '7H', '7S'],
		8: ['8C', '8D',	'8H', '8S'],
		9: ['9C', '9D',	'9H', '9S'],
		10: ['10C', '10D', '10H', '10S',
		'AC', 'AD', 'AH', 'AS',
		'JC', 'JD', 'JH', 'JS',
		'KC', 'KD', 'KH', 'KS',
		'QC', 'QD', 'QH', 'QS']
	}

	playerHit.on('click', hit);
	playerStand.on('click', stand);

	function updateMoney(newmoney, stat) {
		$.post("updatemoney.php", { money: newmoney, status: stat});
	}


	function getMoney() {
		$.get("getmoney.php", data => {
			$(".playerhand__money").html("Money: " + data);
		})
	}

	getMoney();


	function startGame() {
		playerHit.fadeOut(0);
		playerStand.fadeOut(0);
		if(check == 0) {
			giveDealerCards(cards);
			givePlayerCards(cards);
		
			const timer = setTimeout(() => {
				check = 1;
				giveDealerCards(cards);
				givePlayerCards(cards);
				
			}, 1000)
		}
	}


	function giveDealerCards(obj) {

		if(cards.length == 0) {
			return;
		}
		if(playerPoints > 21 || dealerPoints > 21)
			return;


		let property = Math.floor(Math.random() * (10-2+1))  + 2;
		let index = Math.floor(Math.random() * cards[property].length); 

		dealerCards.append(`<img src='cards/${cards[property][index]}.png' width='auto' height='100' class='cards animate'>`);

		setTimeout((index) => {
			dealerCards.last().removeClass("animate");
		}, 1000);


		if(cards[property][index].includes('A') && dealerPoints + 10 > 21)
			dealerPoints += 1;
		else
			dealerPoints += property;


		dealerPointsDiv.html(dealerPoints);


		//remove element from array
		obj[property].splice(index, 1);

		if(check == 1) {
			pointsHiddenCard = property;
			dealerHiddenCard = dealerCards.children().last().attr("src");
			dealerCards.children().last().attr("src", "cards/purple_back.png");
			playerHit.fadeIn();
			playerStand.fadeIn();
			dealerPointsDiv.html(dealerPoints -= pointsHiddenCard);					
		}
	}

	function givePlayerCards(obj) {
		if(cards.length == 0) {
			return;
		}
		if(playerPoints > 21 || dealerPoints > 21)
			return;


		let property = Math.floor(Math.random() * (10-2+1))  + 2;
		let index = Math.floor(Math.random() * cards[property].length); 


		playerCards.append(`<img src='cards/${cards[property][index]}.png' width='auto' height='100' class='cards animate'>`);

		setTimeout((index) => {
			playerCards.last().removeClass("animate");
		}, 1000);


		if(cards[property][index].includes('A') && dealerPoints + 10 > 21)
			playerPoints += 1;
		else
			playerPoints += property;

		playerPointsDiv.html(playerPoints);

		//remove element from array
		obj[property].splice(index, 1);

	}


	async function hit() {

		if(playerPoints <= 20) {
			const finishPlayer = await givePlayerCards(cards);

			if(playerPoints > 21) {
				winnerDisplay.css("visibility", "visible");
				winnerDisplay.css("animation", "slidein 5s linear infinite");
				winner.html("Dealer Wins!");
				updateMoney(bet, 0);
				getMoney();
			}
			else if(playerPoints == 21) {
				setTimeout(() => {
					stand();
				}, 5000);
			}
		}

	}


	async function stand() {
		playerStand.remove();
		playerHit.remove();
		//Draai de omgedraaide kaart om
		if(check == 1) {
			dealerCards.children().last().attr("src", dealerHiddenCard);
			dealerPointsDiv.html(dealerPoints += pointsHiddenCard);
			check = 2;
		}

		//Dealer blijft pakken tot dat hij minimaal 17 heeft
		if(dealerPoints < 17) {	
			setTimeout(() => {
				giveDealerCards(cards);
				stand();
			}, 2000);
		}
		//Stop met pakken en kijk of de dealer meer heeft dan de speler
		else {
			//Kijk nu of de speler meer heeft dan de dealer of dat de dealer over de 21 is gegaan
			if(playerPoints > dealerPoints && playerPoints <= 21 || dealerPoints > 21) {
				winnerDisplay.css("visibility", "visible");
				winnerDisplay.css("animation", "slidein 5s linear infinite");
				winner.html("Player Wins!");
				updateMoney(bet, 1);
				getMoney();
			}
			else if(playerPoints == dealerPoints && dealerPoints < 21 && playerPoints < 21) {
				winnerDisplay.css("visibility", "visible");
				winnerDisplay.css("animation", "slidein 5s linear infinite");
				winner.html("Tie!");
				getMoney();
			}
			//Als de dealer meer heeft dan de speler en niet 'busted' is dan heeft de dealer gewonnen
			else {
				winner.html("Dealer Wins!");
				winnerDisplay.css("visibility", "visible");
				winnerDisplay.css("animation", "slidein 5s linear infinite");
				updateMoney(bet, 0);
				getMoney();
			}
		}
	}
	startGame();
});



//TODO: Als je een Ace kaart krijgt en een 10 Value kaart bij de eerste TWEE kaarten dan heb je gewonnen (Blackjack).
//DONE: Als je een Ace kaart krijgt en door die Ace kaart ga je busten dan wordt de Ace 1 waard ipv van 10.
//TODO: Double Function: Zet 2x je inzet in en krijg 1 kaart.