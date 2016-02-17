CupJS
=====

JavaScript library to build a cup bracket. Takes the number of participants (4, 8, 16, 32, etc.) as a parameter. Create a div with id "tournament".

See example: https://rawgithub.com/juharajajarvi/cupjs/master/cup.html

Usage:
```javascript
        var testCup = new Cup(8);
        testCup.buildBracket();
        
        testCup.addPlayer('1_1_a', 'Jake');
        testCup.addPlayer('1_1_b', 'Patrick');

		testCup.addPlayer('1_2_a', 'Michael');
        testCup.addPlayer('1_2_b', 'Nigel');
		
		testCup.addPlayer('1_3_a', 'Robin');
        testCup.addPlayer('1_3_b', 'Peter');

		testCup.addPlayer('1_4_a', 'Aaron');
        testCup.addPlayer('1_4_b', 'Theo');
		
        testCup.addPlayer('2_1_a', 'Jake');		
		testCup.addPlayer('2_1_b', 'Michael');

        testCup.addPlayer('2_2_a', 'Robin');		
		testCup.addPlayer('2_2_b', 'Theo');		

        testCup.addPlayer('3_1_a', 'Michael');		
		testCup.addPlayer('3_1_b', 'Theo');			

        testCup.addPlayer('winner', 'Theo');
```