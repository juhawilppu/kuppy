import kuppy from '../src/kuppy.js';
import '../src/kuppy.css';
import $ from 'jquery';

window.$ = $; // if Kuppy expects global $
window.jQuery = $;

const demoCase = 16;

const bracket = new kuppy({ elementId: '#tournament', numberOfPlayers: demoCase, boxWidth: demoCase === 16 ? 140 : undefined });

const commands = [];

if (demoCase === 8) {
    commands.push(
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

    )
} else if (demoCase === 16) {
    commands.push(
        // Round of 16
        () => bracket.addPlayer(1, 1, 'UPPER', 'Netherlands 🇳🇱'),
        () => bracket.addPlayer(1, 1, 'BOTTOM', 'USA 🇺🇸'),
        () => bracket.addPlayer(1, 2, 'UPPER', 'Argentina 🇦🇷'),
        () => bracket.addPlayer(1, 2, 'BOTTOM', 'Australia 🇦🇺'),
        () => bracket.addPlayer(1, 3, 'UPPER', 'France 🇫🇷'),
        () => bracket.addPlayer(1, 3, 'BOTTOM', 'Poland 🇵🇱'),
        () => bracket.addPlayer(1, 4, 'UPPER', 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
        () => bracket.addPlayer(1, 4, 'BOTTOM', 'Senegal 🇸🇳'),
        () => bracket.addPlayer(1, 5, 'UPPER', 'Japan 🇯🇵'),
        () => bracket.addPlayer(1, 5, 'BOTTOM', 'Croatia 🇭🇷'),
        () => bracket.addPlayer(1, 6, 'UPPER', 'Brazil 🇧🇷'),
        () => bracket.addPlayer(1, 6, 'BOTTOM', 'South Korea 🇰🇷'),
        () => bracket.addPlayer(1, 7, 'UPPER', 'Morocco 🇲🇦'),
        () => bracket.addPlayer(1, 7, 'BOTTOM', 'Spain 🇪🇸'),
        () => bracket.addPlayer(1, 8, 'UPPER', 'Portugal 🇵🇹'),
        () => bracket.addPlayer(1, 8, 'BOTTOM', 'Switzerland 🇨🇭'),

        // Quarterfinals
        () => bracket.addPlayer(2, 1, 'UPPER', 'Argentina 🇦🇷'),
        () => bracket.addPlayer(2, 1, 'BOTTOM', 'Netherlands 🇳🇱'),
        () => bracket.addPlayer(2, 2, 'UPPER', 'France 🇫🇷'),
        () => bracket.addPlayer(2, 2, 'BOTTOM', 'England 🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
        () => bracket.addPlayer(2, 3, 'UPPER', 'Croatia 🇭🇷'),
        () => bracket.addPlayer(2, 3, 'BOTTOM', 'Brazil 🇧🇷'),
        () => bracket.addPlayer(2, 4, 'UPPER', 'Morocco 🇲🇦'),
        () => bracket.addPlayer(2, 4, 'BOTTOM', 'Portugal 🇵🇹'),

        // Semifinals
        () => bracket.addPlayer(3, 1, 'UPPER', 'Argentina 🇦🇷'),
        () => bracket.addPlayer(3, 1, 'BOTTOM', 'Croatia 🇭🇷'),
        () => bracket.addPlayer(3, 2, 'UPPER', 'France 🇫🇷'),
        () => bracket.addPlayer(3, 2, 'BOTTOM', 'Morocco 🇲🇦'),

        // Final
        () => bracket.addPlayer(4, 1, 'UPPER', 'Argentina 🇦🇷'),
        () => bracket.addPlayer(4, 1, 'BOTTOM', 'France 🇫🇷'),

        // Winner
        () => bracket.addPlayer(5, 1, 'UPPER', 'Argentina 🇦🇷')
    );
}

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