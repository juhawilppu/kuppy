
function Cup(numberOfPlayers) {

    this.$tournament = $('#tournament');
    this.numberOfPlayers = numberOfPlayers;


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
        this.getElementByMatchId(id).find('.name').html(name);
    };
    
    this.getElementByMatchId = function(matchId) {
        return $('div[id="'+matchId+'"]');
    };

    this.getCoordinatesByMatchId = function(matchId) {
        var $element = this.getElementByMatchId(matchId);
        return this.getCoordinates($element);
    };

    this.getCoordinates = function($element) {

        var x = $element.offset().left + $element.width();
        var y = $element.offset().top + $element.height()/2.0;
        
        return {x:x,y:y};
    };

    this.setName = function(matchId, name) {
        getElementByMatchId(matchId).find('.name').html(name);
    };

    this.setWinner = function(name) {
        getElementByMatchId(winnerId).addClass('winner');
    };

    this.setTrophyWinner = function(winnerId) {
        getElementByMatchId(winnerId).addClass('trophy');
    };

    this.getCoordinatesCss = function($element) {

        var x = $element.offset().left + $element.width();
        var y = parseInt( $element.css('top') )
        
        return {x:x,y:y}
    };

    this.addConnector = function(matchId1, matchId2, longVersion) {

        var offset = 0;

        if ( longVersion === true ) {
            offset = this.getElementByMatchId(matchId1).width();
        }

        var coords1 = this.getCoordinatesByMatchId(matchId1),
            coords2 = this.getCoordinatesByMatchId(matchId2),
            $connector = $('<div class="connector"></div>');

        $connector
            .css('height', (coords2.y - coords1.y) +'px' )
            .css('width', (100+offset) +'px' )
            .css('top', coords1.y)
            .css('left', (coords1.x-offset))
            
        $connector.appendTo('body')
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
        var parents = this.getParentsId(round, 1, true);
        
        this._drawWinner(id, parents);
    };
    
    this._drawWinner = function(ownId, parents) {
        
        var $element = $('<div id="'+ownId+'" class="box"><div class="name"></div><div class="score"></div></div>');
    
        $element.appendTo( this.$tournament );
        
        var roundOffset = $element.width()/2.0;
                
        var first_coords = this.getCoordinatesCss( $("div[id='"+parents.a+"']") ),
            second_coords = this.getCoordinatesCss( $("div[id='"+parents.b+"']") );
                
        $element
            .css('left', (first_coords.x+second_coords.x)/2.0 + roundOffset + 'px')
            .css('top',  (first_coords.y+second_coords.y)/2.0 + 'px');
            
    };
    
    this.getParentsId = function(ownRound, ownPair, isFirst) {
    
        var parentRound = ownRound-1;
        
        var parentPair = ownPair*2;
    
        if (isFirst) {
            parentPair--;
        }
    
        var first_parent = parentRound + '_' + parentPair  + '_a';
        var second_parent = parentRound + '_' + parentPair  + '_b';
        
        return {a:first_parent, b:second_parent};
    };
    
    this._drawPairForRound = function(round, pair) {
    
        var a_id = round + '_' + pair + '_a';
        var b_id = round + '_' + pair + '_b';

        var a_parents = this.getParentsId(round, pair, true);
        var b_parents = this.getParentsId(round, pair, false);

        this._drawWinner(a_id, a_parents);
        this._drawWinner(b_id, b_parents);    
            
        this.addConnector(a_id, b_id);
        
    };
    
    this._drawPairForFirstRound = function(round, pair) {
    
        var firstId = round + '_' + pair + '_a';
        var secondId = round + '_' + pair + '_b';
        
        var $firstPlayer = $('<div id="'+firstId+'" class="box"><div class="name"></div><div class="score"></div></div>');
        var $secondPlayer = $('<div id="'+secondId+'" class="box"><div class="name"></div><div class="score"></div></div>');
                
        $firstPlayer.appendTo( this.$tournament );
        $secondPlayer.appendTo( this.$tournament );
    
        var pairMarginFactor = 1.6,
        groupMarginFactor = 4,
        roundMarginFactor = 3;
            
        var elementHeight = $firstPlayer.height();
        var elementWidth = $firstPlayer.width();
            
        var offset_first_y = (pair-1)*(elementHeight*groupMarginFactor);
        var offset_second_y = offset_first_y+ elementHeight*pairMarginFactor;
        
        $firstPlayer
            .css('top', offset_first_y+'px');
        
        $secondPlayer
            .css('top', offset_second_y+'px');
        
        this.addConnector(firstId, secondId);
    };

}