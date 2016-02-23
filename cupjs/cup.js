/*
 * CupJS -- library for building a cup bracket for a tournament.
 *
 * Copyright 2016 Juha Rajajärvi
 * Released under the MIT license
 * https://jquery.org/license
 *
 */

function Cup(elementId, numberOfPlayers) {

	var that=this;

	this.$tournament = $(elementId);
	this.$tournament.addClass('cupjs');
	this.numberOfPlayers = numberOfPlayers;

	/* Distance (px) between two players that form a pair. */
	this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR = 0;

	/* Distance between two pairs. */
	this.DISTANCE_BETWEEN_PAIRS = 3;

	/* Distance between rounds in terms of box width. */
	this.DISTANCE_BETWEEN_ROUNDS = 0.5;

	/* Words for pair */
	this.UPPER = 'UPPER';
	this.BOTTOM = 'BOTTOM';

	this.isInited = false;
	this.CONNECTOR_OFFSET = 15;
	
	/** Public methods **/
	
	this.buildBracket = function () {

		this.$tournament.append("<div id='connectors'></div>");

		var round = 0;
		var playersLeft = 0;

		do {
			round++;

			playersLeft = this.numberOfPlayers / Math.pow(2, round - 1);

			for (var pair = 1; pair <= playersLeft / 2; pair++) {
				this._drawPair(round, pair);
			}

		} while (playersLeft !== 1);

		this._drawWinnerOfCup(round);

	};

	this.addPlayer = function (round, pair, part, name) {
		this._getElementByMatchId(round + '_' + pair + '_' + part)
		.find('input').val(name);
	};

	this.setIsInited = function(isInited) {
		that.isInited=isInited;

		if (that.isInited===true) {
			that.$tournament.removeClass('incomplete');
			that.$tournament.find('input').attr('readonly', 'readonly');
		} else {
			that.$tournament.addClass('incomplete');
		}
	}

	/** Private methods **/

	this._getElementByMatchId = function (matchId) {
		return $('div[id="' + matchId + '"]');
	};

	this._getCoordinatesByMatchId = function (matchId) {
		var $element = this._getElementByMatchId(matchId);
		return this._getCoordinates($element);
	};

	this._getCoordinates = function ($element) {

		var x = $element.offset().left - this.$tournament.offset().left + $element.width();
		var y = $element.offset().top - this.$tournament.offset().top + $element.height() / 2.0;

		return {
			x : x,
			y : y
		};
	};

	this._getCoordinatesCss = function ($element) {

		var x = $element.offset().left + $element.width();
		var y = parseInt($element.css('top'))

			return {
			x : x,
			y : y
		}
	};

	this._addConnector = function (matchId1, matchId2, longVersion) {

		var offset = 0;

		if (longVersion === true) {
			offset = this._getElementByMatchId(matchId1).width();
		}

		var coords1 = this._getCoordinatesByMatchId(matchId1),
		coords2 = this._getCoordinatesByMatchId(matchId2),
		$connector = $('<div></div>');
		$connector.addClass('connector');
			
		if (coords2.y - coords1.y < 50) {
			$connector
			.css('height', 1 + 'px')
			.css('width', (100 + offset) + 'px')
			.css('top', coords1.y+ this.CONNECTOR_OFFSET)
			.css('left', (coords1.x - offset-5));
			
			$connector.addClass('single-line-connector');
		} else {
			$connector
			.css('height', (coords2.y - coords1.y - this.CONNECTOR_OFFSET*2 - 1) + 'px')
			.css('width', (100 + offset) + 'px')
			.css('top', coords1.y+ this.CONNECTOR_OFFSET)
			.css('left', (coords1.x - offset-5))
		}

		$connector.appendTo($('#connectors'));
	};

	this._drawPair = function (round, pair) {

		// First round does not have connectors
		if (round === 1) {
			this._drawPairForFirstRound(round, pair);
		} else {
			this._drawPairForRound(round, pair);
		}

	};

	this._drawWinnerOfCup = function (round) {
		var parents = this._getParentsId(round, 1, this.UPPER, true);
		this._drawWinner(round, 1, this.UPPER, parents, true);

		this._addConnector(
			this._getId(parents.a.round, parents.a.pair, this.UPPER),
			this._getId(parents.b.round, parents.b.pair, this.BOTTOM)
		);
	};

	this._drawWinner = function (round, pair, upperBottom, parents, isWinnerOfCup) {

		var $element = this._createPlayerBoxElement(round, pair, upperBottom);
		$element.appendTo(this.$tournament);
		this._addClickListenerForProceedingToNextLevel($element);

		var roundOffset = $element.width() * this.DISTANCE_BETWEEN_ROUNDS;
		var elementHeight = $element.height();

		var first_coords = this._getCoordinatesCss($("div[id='" + parents.a.id + "']")),
		second_coords = this._getCoordinatesCss($("div[id='" + parents.b.id + "']"));

		var offset_y;
		if (isWinnerOfCup === true) {
			offset_y = 0;
		} else if (upperBottom == this.UPPER) {
				offset_y = (-1)*(elementHeight/2.0 + this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR/2.0);
		} else if (upperBottom == this.BOTTOM) {
				offset_y = elementHeight/2.0 + this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR/2.0;
		}

		$element
		.css('left', (first_coords.x + second_coords.x) * this.DISTANCE_BETWEEN_ROUNDS + roundOffset + 'px')
		.css('top', (first_coords.y + second_coords.y) * this.DISTANCE_BETWEEN_ROUNDS + offset_y + 'px');

	};

	this._getParentsId = function (ownRound, ownPair, upperBottom, isWinnerOfCup) {

		var parentRound = ownRound - 1;
		var parentPair = ownPair * 2;

		var first_parent;
		var second_parent;

		if (isWinnerOfCup === true) {
			// Winner of cup is the only box, which is based on parents
			// from the same pair
			first_parent = parentRound + '_' + 1 + '_' + this.UPPER;
			second_parent = parentRound + '_' + 1 + '_' + this.BOTTOM;

			return {
				a : {id: first_parent, round: parentRound, pair: 1},
				b : {id: second_parent, round: parentRound, pair: 1}
			};

		} else {
			first_parent = parentRound + '_' + (parentPair-1) + '_' + this.BOTTOM;
			second_parent = parentRound + '_' + parentPair + '_' + this.UPPER;

			return {
				a : {id: first_parent, round: parentRound, pair: parentPair-1},
				b : {id: second_parent, round: parentRound, pair: parentPair}
			};
		}

	};

	this._getId = function(round, pair, upperBottom) {
		return round + '_' + pair + '_' + upperBottom;
	}

	this._createPlayerBoxElement = function(round, pair, upperBottom) {
		var generated_id = this._getId(round, pair, upperBottom);
		var $element= $('<div id="' + generated_id + '" round="'+round+'" pair="'+pair+'" upperBottom="'+upperBottom+'" class="box"><input class="name"></div>');

		if (round == 1) {
			//$element.find('input').attr('placeholder', 'Write name');
		} else {
			$element.find('input').attr('readonly', 'readonly');
		}
		

		return $element;
	}

	this._addClickListenerForProceedingToNextLevel = function($element) {
		var that=this;
		$element.on('click', function() {
			if (that.isInited) {
				var round = parseInt($(this).attr('round'));
				var pair = parseInt($(this).attr('pair'));
				var upperBottom = $(this).attr('upperBottom');
				var otherUpperBottom = upperBottom == that.UPPER ? that.BOTTOM : that.UPPER;
				
				var name = $(this).find('input').val();

				var nextRound = round+1;
				var nextPair = Math.ceil(pair/2);
				var nextUpperBottom;
				if (pair % 2 == 0) {
					nextUpperBottom = that.BOTTOM;
				} else {
					nextUpperBottom = that.UPPER;
				}

				that.addPlayer(nextRound, nextPair, nextUpperBottom, name);
				$('#' + that._getId(round, pair, otherUpperBottom)).addClass('knocked-out');
				$element.removeClass('knocked-out');
				
			}
		});
	}

	this._drawPairForFirstRound = function (round, pair) {

		var $firstPlayer = this._createPlayerBoxElement(round, pair, this.UPPER);
		var $secondPlayer = this._createPlayerBoxElement(round, pair, this.BOTTOM);

		$firstPlayer.appendTo(this.$tournament);
		$secondPlayer.appendTo(this.$tournament);

		this._addClickListenerForProceedingToNextLevel($firstPlayer);
		this._addClickListenerForProceedingToNextLevel($secondPlayer);

		var elementHeight = $firstPlayer.height();
		var elementWidth = $firstPlayer.width();

		// TODO Maybe do this better...
		var multiplyFactor = 0;
		if (pair >= 3 ) {
			multiplyFactor+=1;
		}
		if (pair >= 5 ) {
			multiplyFactor+=2;
		}
		if (pair >= 7 ) {
			multiplyFactor+=1;
		}
		if (pair >= 9 ) {
			multiplyFactor+=4;
		}
		if (pair >= 11 ) {
			multiplyFactor+=1;
		}		
		if (pair >= 13 ) {
			multiplyFactor+=2;
		}			
		if (pair >= 15 ) {
			multiplyFactor+=1;
		}	
		
		this.EXTRA_DISTANCE = 55;
		
		var offset_first_y = (pair - 1) * (elementHeight * this.DISTANCE_BETWEEN_PAIRS) + multiplyFactor * this.EXTRA_DISTANCE;		
		var offset_second_y = offset_first_y + elementHeight + this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR;
		
		
		$firstPlayer
		.css('top', offset_first_y + 'px');

		$secondPlayer
		.css('top', offset_second_y + 'px');
	};

	this._drawPairForRound = function (round, pair) {

		var a_parents = this._getParentsId(round, pair, this.UPPER, false);
		var b_parents = this._getParentsId(round, pair, this.BOTTOM, false);

		this._drawWinner(round, pair, this.UPPER, a_parents);
		this._drawWinner(round, pair, this.BOTTOM, b_parents);

		this._addConnector(
			this._getId(a_parents.a.round, a_parents.a.pair, this.UPPER),
			this._getId(b_parents.b.round, b_parents.b.pair, this.BOTTOM)
		);


	};

}
