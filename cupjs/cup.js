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

	/* Distance between two players that form a pair. */
	this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR = 0.2;

	/* Distance between two pairs. */
	this.DISTANCE_BETWEEN_PAIRS = 4;

	/* Distance between rounds in terms of box width. */
	this.DISTANCE_BETWEEN_ROUNDS = 0.5;
	
	/* Words for pair */
	this.UPPER = 'UPPER';
	this.BOTTOM = 'BOTTOM';

	this.isInited = false;
	
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
		.attr('name', name)
		.find('input').val(name);
	};

	this.setWinner = function (name) {
		this._getElementByMatchId('winner').find('input').val(name);
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
		$connector = $('<div class="connector"></div>');

		$connector
		.css('height', (coords2.y - coords1.y) + 'px')
		.css('width', (100 + offset) + 'px')
		.css('top', coords1.y)
		.css('left', (coords1.x - offset))

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
		var parents = this._getParentsId(round, 1, true);
		this._drawWinner(round, 1, this.UPPER, parents);
	};

	this._drawWinner = function (round, pair, upperBottom, parents) {

		var $element = this._createPlayerBoxElement(round, pair, upperBottom);
		$element.appendTo(this.$tournament);
		this._addClickListenerForProceedingToNextLevel($element);

		var roundOffset = $element.width() * this.DISTANCE_BETWEEN_ROUNDS;

		var first_coords = this._getCoordinatesCss($("div[id='" + parents.a + "']")),
		second_coords = this._getCoordinatesCss($("div[id='" + parents.b + "']"));

		$element
		.css('left', (first_coords.x + second_coords.x) * this.DISTANCE_BETWEEN_ROUNDS + roundOffset + 'px')
		.css('top', (first_coords.y + second_coords.y) * this.DISTANCE_BETWEEN_ROUNDS + 'px');

	};

	this._getParentsId = function (ownRound, ownPair, isFirst) {

		var parentRound = ownRound - 1;
		var parentPair = ownPair * 2;

		if (isFirst) {
			parentPair--;
		}

		var first_parent = parentRound + '_' + parentPair + '_' + this.UPPER;
		var second_parent = parentRound + '_' + parentPair + '_' + this.BOTTOM;

		return {
			a : first_parent,
			b : second_parent
		};
	};

	this._getId = function(round, pair, upperBottom) {
		return round + '_' + pair + '_' + upperBottom;
	}
	
	this._createPlayerBoxElement = function(round, pair, upperBottom) {
		var generated_id = this._getId(round, pair, upperBottom);
		return $('<div id="' + generated_id + '" round="'+round+'" pair="'+pair+'" upperBottom="'+upperBottom+'" class="box"><input class="name"></div>');
	}
	
	this._addClickListenerForProceedingToNextLevel = function($element) {
		var that=this;
		$element.on('click', function() {

			if (that.isInited) {
				var round = parseInt($(this).attr('round'));
				var pair = parseInt($(this).attr('pair'));			
				var name = $(this).attr('name');	
				
				var nextRound = round+1;
				var nextPair = Math.ceil(pair/2);
				var nextUpperBottom;
				if (pair % 2 == 0) {
					nextUpperBottom = that.BOTTOM;
				} else {
					nextUpperBottom = that.UPPER;
				}
				
				that.addPlayer(nextRound, nextPair, nextUpperBottom, name);
			} else {
				$element.find('input').on('blur', function() {
					$(this).parent().attr('name', $(this).val());
				});
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

		var offset_first_y = (pair - 1) * (elementHeight * this.DISTANCE_BETWEEN_PAIRS);
		var offset_second_y = offset_first_y + elementHeight * (1+this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR);

		$firstPlayer
		.css('top', offset_first_y + 'px');

		$secondPlayer
		.css('top', offset_second_y + 'px');

		this._addConnector(
			this._getId(round, pair, this.UPPER),
			this._getId(round, pair, this.BOTTOM)
		);
	};
	
	this._drawPairForRound = function (round, pair) {

		var a_parents = this._getParentsId(round, pair, true);
		var b_parents = this._getParentsId(round, pair, false);

		this._drawWinner(round, pair, this.UPPER, a_parents);
		this._drawWinner(round, pair, this.BOTTOM, b_parents);

		this._addConnector(
			this._getId(round, pair, this.UPPER),
			this._getId(round, pair, this.BOTTOM)
		);

	};

}
