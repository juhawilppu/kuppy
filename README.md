CupJS
=====

JavaScript library to build a cup bracket. Takes the number of participants (4, 8, 16, 32, etc.) as a parameter. Adding players to the cup and proceeding them to next rounds is not currently very easy to use.

See example: https://rawgithub.com/juharajajarvi/cupjs/master/cup.html

Usage:
```javascript
var testCup = new Cup(8);
testCup.buildBracket();

testCup.addPlayer('1_1_a', 'Juha');
testCup.addPlayer('1_1_b', 'Janne');
testCup.addPlayer('2_1_a', 'Juha');
```