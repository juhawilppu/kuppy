import kuppy from '../src/kuppy.js';
import '../src/kuppy.css';
import $ from 'jquery';

window.$ = $; // if Kuppy expects global $
window.jQuery = $;

const bracket = new kuppy({ elementId: '#tournament', numberOfPlayers: 8 });

const commands = [
    () => bracket.addPlayer(1, 1, 'UPPER', 'Jake'),
    () => bracket.addPlayer(1, 1, 'BOTTOM', 'Patrick'),
    () => bracket.addPlayer(1, 2, 'UPPER', 'Michael'),
    () => bracket.addPlayer(1, 2, 'BOTTOM', 'Nigel'),
    () => bracket.addPlayer(1, 3, 'UPPER', 'Robin'),
    () => bracket.addPlayer(1, 3, 'BOTTOM', 'Peter'),
    () => bracket.addPlayer(1, 4, 'UPPER', 'Aaron'),
    () => bracket.addPlayer(1, 4, 'BOTTOM', 'Theo'),

    () => bracket.addPlayer(2, 1, 'UPPER', 'Jake'),
    () => bracket.addPlayer(2, 1, 'BOTTOM', 'Michael'),
    () => bracket.addPlayer(2, 2, 'UPPER', 'Robin'),
    () => bracket.addPlayer(2, 2, 'BOTTOM', 'Theo'),

    () => bracket.addPlayer(3, 1, 'UPPER', 'Michael'),
    () => bracket.addPlayer(3, 1, 'BOTTOM', 'Theo'),

    () => bracket.addPlayer(4, 1, 'UPPER', 'Theo')
]

const videoMode = true;
if (videoMode) {
    // Run commands with delay
    setTimeout(() => {
        commands.forEach((command, index) => {
            setTimeout(() => {
                command();
            }, index * 175);
        });
    }, 1000);
} else {
    // Run commands immediately
    commands.forEach((command, index) => {
        command();
    });
}