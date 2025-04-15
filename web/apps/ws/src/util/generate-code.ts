import { Games } from '../game/Game';

const NUMBERS = '0123456789';
const LENGTH = 6;

export const generateCode = (): string => {
    const existingCodes = Games.map((game) => game.code);
    let code = '';
    for (let i = 0; i < LENGTH; i++) {
        code += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
    }
    while (existingCodes.includes(code)) {
        code = '';
        for (let i = 0; i < LENGTH; i++) {
            code += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
        }
    }

    return code;
};
