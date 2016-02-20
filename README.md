CupJS
=====

JavaScript library for building a cup bracket.

**Features**
- Supports any number of participants (4, 8, 16, 32, etc).
- Proceed players to following rounds by clicking the name of the player. Also possible by calling the JavaScript object.

See it in action: https://rawgithub.com/juharajajarvi/cupjs/master/example.html

Usage:
```javascript
        var testCup = new Cup(8);
        testCup.buildBracket();
        
		// 1st round, 1st pair
        testCup.addPlayer(1,1,'UPPER', 'Jake');
        testCup.addPlayer(1,1,'BOTTOM', 'Patrick');

		// 1st round, 2nd pair
		testCup.addPlayer(1,2,'UPPER', 'Michael');
        testCup.addPlayer(1,2,'BOTTOM', 'Nigel');
		
		// 1st round, 3rd pair
		testCup.addPlayer(1,3,'UPPER', 'Robin');
        testCup.addPlayer(1,3,'BOTTOM', 'Peter');

		// 1st round, 4th pair
		testCup.addPlayer(1,4,'UPPER', 'Aaron');
        testCup.addPlayer(1,4,'BOTTOM', 'Theo');
		
		// 2nd round, 1st pair
        testCup.addPlayer(2,1,'UPPER', 'Jake');		
		testCup.addPlayer(2,1,'BOTTOM', 'Michael');

		// 2nd round, 2nd pair
        testCup.addPlayer(2,2,'UPPER', 'Robin');		
		testCup.addPlayer(2,2,'BOTTOM', 'Theo');		

		// 3rd round, 1st pair
        testCup.addPlayer(3,1,'UPPER', 'Michael');		
		testCup.addPlayer(3,1,'BOTTOM', 'Theo');

		// Winner
        testCup.setWinner('Theo');
		
```