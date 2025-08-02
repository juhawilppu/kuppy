# Kuppy

**Kuppy** is a minimal JavaScript library for building interactive cup brackets (e.g. 8-player single elimination). It works with plain HTML and lets you programmatically or interactively move players through the rounds.

Originally built in 2013. Cleaned up in 2025.

![Kuppy bracket example](media/kuppy-screenshot.png)

### Why I built it

Back in 2013, I was building a multiplayer online learning game as part of my university studies. The game featured a knockout tournament where students competed in a math challenge. Each match consisted of two players going head-to-head. Both were shown five questions — things like `1 × 5`, `6 × 3`, or `2 × 6` — and the player who answered more correctly (or faster) won the match.

The winner advanced to the next round. The loser was eliminated but could join a new tournament. It was like *Battlefield*, but with mathematics!

I needed a way to render the tournament bracket, but there were no good open-source libraries at the time. So I built my own. That library eventually became Kuppy.

### ✨ Features

- Supports any power-of-two number of players (4, 8, 16, 32, …)
- Add players programmatically
- Advance winners by clicking on their names
- Pure JavaScript — no dependencies

### 📺 Demo

- [Live demo](https://juhawilppu.com/kuppy/)

### 🚀 Usage

```js
const kuppy = new Kuppy('#tournament', 8);
kuppy.buildBracket();

kuppy.addPlayer(1, 1, 'UPPER', 'Jake');
kuppy.addPlayer(1, 1, 'BOTTOM', 'Patrick');
// ...
