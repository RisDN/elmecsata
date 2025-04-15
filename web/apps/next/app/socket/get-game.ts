import { Game } from '@elmecsata/types';
import { socketUrl } from '../socket-url';

const getGame = async (code: string): Promise<Game> => {
    const response = await fetch(socketUrl + '/api/get-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    });

    const data = await response.json();

    return data as Game;
};

export default getGame;
