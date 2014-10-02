$(document).ready(function(){
	/********************************************************************************/
	/*********************************TODO List*************************************/
	// Features to add: 
	//					Teams radio button
	//					Individual bets for Teams
	//					Hand counter
	//					Randomizer for dealer
	//					Player add/remove buttons
	/********************************************************************************/
	
	/********************************Global Variables********************************/
	var playerArray = [];
	var round = 1;
	
	/************************************OBJECTS************************************/
	//Player object.  Stores the player's "number" and score. 
	function player(name) {
		this.name = name;
		this.score = 0;
		this.playerNumber = "Player" + playerArray.length;
		this.bet = 0;
	}
	
	/******************************JavaScript Functions*****************************/
	//Function that creates a new player object.  Takes in name as input.
	var addPlayer = function(name){
		if(playerArray.length > 5){
			alert("Sorry, you've reached the max number of players.");
		}
		else{
			if (name == ''){
				alert("Stop messing around.  Put in an actual name!");
			}
			else{
				playerArray.push(new player(name));
				$('#playerList').append('<div class="ui-block-a" style="padding:1em; font-size:large">' + playerArray[playerArray.length - 1].name + '</div>');
				$('#playerList').append('<div class="ui-block-b remove-btn" data-role="button" ui-icon="minus"><image src="img/minus.png" width="25" height="25" id="remove-btn"></div>');
				addPlayerToGameScreen(name);
				addPlayerToScoreScreen(name);
			}
		}
	};
	
	//Function that adds the Player to the Game screen.  Sets up the columns and rows.  Also gives unique ID, that is tied to a player object, to each rows checkbox and bet so that it can be checked for scoring.
	var addPlayerToGameScreen = function(name){
		$('#gameScreen').append('<div class="ui-block-a" style="width:40%; padding: .5em; font-size: large;">' + playerArray[playerArray.length - 1].name + '<div>');
        if ($('input[name=teams-flip]').is(':checked')){
            $('#gameScreen').append('<div class="ui-block-b" style="width:30%; padding: .5em;">' + '<input type="number" data-role="none" min="0" max="12" style ="width:3em; margin-right:.5em">' + '<input type="number" data-role="none" min="0" max="12" style ="width:3em" name="' + playerArray[playerArray.length - 1].playerNumber + 'Bet">' + '</div>');
            $('#gameScreen').append('<div class="ui-block-c" style="width:30%; padding: .5em;">' + '<input type="checkbox" data-role="none" name="' + playerArray[playerArray.length - 1].playerNumber + 'Check">' + '</div>');
        }
        else {
            $('#gameScreen').append('<div class="ui-block-b" style="width:30%; padding: .5em;">' + '<input type="number" data-role="none" min="0" max="12" style ="width:3em" name="' + playerArray[playerArray.length - 1].playerNumber + 'Bet">' + '</div>');
            $('#gameScreen').append('<div class="ui-block-c" style="width:30%; padding: .5em;">' + '<input type="checkbox" data-role="none" name="' + playerArray[playerArray.length - 1].playerNumber + 'Check">' + '</div>');
        }
	};
	
	//Function adds player to player screen
	//var addPlayerToPlayerScreen = function(name){
		
	
	//This function adds the player to the score screen Assigning the ID to the playerID.
	var addPlayerToScoreScreen = function(name){
		$('#player_col').append('<td id="' + playerArray[playerArray.length - 1].playerNumber + '"><b>' + name + '</b></td>');
	};
	
	/****************************Scoring System Function****************************/
	var scoreRound = function(){
		//var player = this.playerArray;
		$('#scores_table').append('<tr id="round' + round +'">' + '<td>' + round + '</td>');
		for(var x=0;x < playerArray.length;x++){
			var bet = parseInt($('input[name=' + playerArray[x].playerNumber + 'Bet]').val(), 10);
			var happy = $('input[name=' + playerArray[x].playerNumber + 'Check]').is(':checked');
			if(happy === true){
				playerArray[x].score = playerArray[x].score + 10 + bet;
				$('input[name=' + playerArray[x].playerNumber + 'Bet]').val('');
				$('input[name=' + playerArray[x].playerNumber + 'Check]').prop("checked", false);
				$('#round' + round).append('<td>' + playerArray[x].score + '</td>');
				//alert(playerArray[x].score);
			}
			else{
				playerArray[x].score = playerArray[x].score - bet;
				$('input[name=' + playerArray[x].playerNumber + 'Bet]').val('');
				$('#round' + round).append('<td style="color:red;">' + playerArray[x].score + '</td>');
				//alert(playerArray[x].score);
			}
		}
		$('#scores_table').append('</tr>');
		round += 1;
	};

	
	/********************************JQuery Functions*******************************/
	//This function listens for the add button (id of btn-add) to be clicked and calls the functions that add players once it is called. 
	$('#add_players').on('click', '#btn-add', function(){
		var toAdd = $('input[name=playerNameInput]').val();
		addPlayer(toAdd);
		$('input[name=playerNameInput]').val('');  //resets the input box to blank
	});
	
	//This function listens for the Next Round button (id: sbmt_rnd) to be clicked and starts the scoring once it has
	$('#scoringRoundScreen').on('click', '#next_btn', function(){
		scoreRound();
		window.location ='#Scores';
	})
});