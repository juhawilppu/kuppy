/*
 * CupJS -- library for building a cup bracket for a tournament.
 * 
 * Copyright 2016 Juha Rajajärvi
 * Released under the MIT license
 * https://jquery.org/license
 *
 */


function Cup(elementId, numberOfPlayers) {

    this.$tournament = $(elementId);	
	this.$tournament.addClass('cupjs');	
    this.numberOfPlayers = numberOfPlayers;

	/* Distance between two players that form a pair. */
	this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR = 1.6;
	
	/* Distance between two pairs. */
    this.DISTANCE_BETWEEN_PAIRS = 4;
	
	
	/** Public methods **/
	
    this.buildBracket = function() {

        var round = 0;
        var playersLeft = 0;
        
        do {
            round++;

            playersLeft = this.numberOfPlayers / Math.pow(2, round-1);                
            
            for (var pair=1; pair <= playersLeft/2; pair++) {
                this._drawPair(round, pair);
            }
        
        } while ( playersLeft !== 1);
        
        this._drawWinnerOfCup(round);
        
    };
    
    this.addPlayer = function(id, name) {
        this._getElementByMatchId(id).find('.name').html(name);
    };
    
	this.setWinner = function(name) {
        _getElementByMatchId(winnerId).addClass('winner');
    };
	
	
	/** Private methods **/
	
    this._getElementByMatchId = function(matchId) {
        return $('div[id="'+matchId+'"]');
    };

    this._getCoordinatesByMatchId = function(matchId) {
        var $element = this._getElementByMatchId(matchId);
        return this._getCoordinates($element);
    };

    this._getCoordinates = function($element) {

        var x = $element.offset().left + $element.width();
        var y = $element.offset().top + $element.height()/2.0;
        
        return {x:x,y:y};
    };

    this._getCoordinatesCss = function($element) {

        var x = $element.offset().left + $element.width();
        var y = parseInt( $element.css('top') )
        
        return {x:x,y:y}
    };

    this._addConnector = function(matchId1, matchId2, longVersion) {

        var offset = 0;

        if ( longVersion === true ) {
            offset = this._getElementByMatchId(matchId1).width();
        }

        var coords1 = this._getCoordinatesByMatchId(matchId1),
            coords2 = this._getCoordinatesByMatchId(matchId2),
            $connector = $('<div class="connector"></div>');

        $connector
            .css('height', (coords2.y - coords1.y) +'px' )
            .css('width', (100+offset) +'px' )
            .css('top', coords1.y)
            .css('left', (coords1.x-offset))
            
        $connector.appendTo('body');
    };

    this._drawPair = function(round, pair) {

        if ( round === 1 ) {
            this._drawPairForFirstRound(round, pair);
        } else {
            this._drawPairForRound(round, pair);
        }

    };
    
    this._drawWinnerOfCup = function(round) {
        var id = 'winner';
        var parents = this._getParentsId(round, 1, true);
        
        this._drawWinner(id, parents);
    };
    
    this._drawWinner = function(ownId, parents) {
        
        var $element = $('<div id="'+ownId+'" class="box"><div class="name"></div></div>');
    
        $element.appendTo( this.$tournament );
        
        var roundOffset = $element.width()/2.0;
                
        var first_coords = this._getCoordinatesCss( $("div[id='"+parents.a+"']") ),
            second_coords = this._getCoordinatesCss( $("div[id='"+parents.b+"']") );
                
        $element
            .css('left', (first_coords.x+second_coords.x)/2.0 + roundOffset + 'px')
            .css('top',  (first_coords.y+second_coords.y)/2.0 + 'px');
            
    };
    
    this._getParentsId = function(ownRound, ownPair, isFirst) {
    
        var parentRound = ownRound-1;
        
        var parentPair = ownPair*2;
    
        if (isFirst) {
            parentPair--;
        }
    
        var first_parent = parentRound + '_' + parentPair  + '_UPPER';
        var second_parent = parentRound + '_' + parentPair  + '_BOTTOM';
        
        return {a:first_parent, b:second_parent};
    };
    
    this._drawPairForRound = function(round, pair) {
    
        var a_id = round + '_' + pair + '_UPPER';
        var b_id = round + '_' + pair + '_BOTTOM';

        var a_parents = this._getParentsId(round, pair, true);
        var b_parents = this._getParentsId(round, pair, false);

        this._drawWinner(a_id, a_parents);
        this._drawWinner(b_id, b_parents);    
            
        this._addConnector(a_id, b_id);
        
    };
    
    this._drawPairForFirstRound = function(round, pair) {
    
        var firstId = round + '_' + pair + '_UPPER';
        var secondId = round + '_' + pair + '_BOTTOM';
        
        var $firstPlayer = $('<div id="'+firstId+'" class="box"><div class="name"></div><div class="score"></div></div>');
        var $secondPlayer = $('<div id="'+secondId+'" class="box"><div class="name"></div><div class="score"></div></div>');
                
        $firstPlayer.appendTo( this.$tournament );
        $secondPlayer.appendTo( this.$tournament );
            
        var elementHeight = $firstPlayer.height();
        var elementWidth = $firstPlayer.width();
            
        var offset_first_y = (pair-1)*(elementHeight*this.DISTANCE_BETWEEN_PAIRS);
        var offset_second_y = offset_first_y+ elementHeight*this.DISTANCE_BETWEEN_PLAYERS_IN_A_PAIR;
        
        $firstPlayer
            .css('top', offset_first_y+'px');
        
        $secondPlayer
            .css('top', offset_second_y+'px');
        
        this._addConnector(firstId, secondId);
    };

}