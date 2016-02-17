CupJS
=====

JavaScript library to build a cup bracket. Takes the number of participants (4, 8, 16, 32, etc.) as a parameter. Create a div with id "tournament".

See example: https://rawgithub.com/juharajajarvi/cupjs/master/example.html

Usage:
```javascript
        var testCup = new Cup(8);
        testCup.buildBracket();
        
        testCup.addPlayer(1,1,'UPPER', 'Jake');
        testCup.addPlayer(1,1,'BOTTOM', 'Patrick');

		testCup.addPlayer(1,2,'UPPER', 'Michael');
        testCup.addPlayer(1,2,'BOTTOM', 'Nigel');
		
		testCup.addPlayer(1,3,'UPPER', 'Robin');
        testCup.addPlayer(1,3,'BOTTOM', 'Peter');

		testCup.addPlayer(1,4,'UPPER', 'Aaron');
        testCup.addPlayer(1,4,'BOTTOM', 'Theo');
		
        testCup.addPlayer(2,1,'UPPER', 'Jake');		
		testCup.addPlayer(2,1,'BOTTOM', 'Michael');

        testCup.addPlayer(2,2,'UPPER', 'Robin');		
		testCup.addPlayer(2,2,'BOTTOM', 'Theo');		

        testCup.addPlayer(3,1,'UPPER', 'Michael');		
		testCup.addPlayer(3,1,'BOTTOM', 'Theo');

        testCup.setWinner('Theo');
		
```