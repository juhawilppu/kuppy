CupJS
=====

JavaScript library to build a cup bracket. Takes the number of participants (4, 8, 16, 32, etc.) as a parameter.

Usage:
```javascript
testCup = new Cup(8);
testCup.buildBracket();

testCup.addPlayer('1_1_a', 'Juha');
testCup.addPlayer('1_1_b', 'Janne');
testCup.addPlayer('2_1_a', 'Juha');
```