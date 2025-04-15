import { socketUrl } from '../socket-url';

const isValidCode = async (code: string): Promise<boolean> => {
    const response = await fetch(socketUrl + '/api/valid-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    });

    const data = await response.json();

    return data.valid;
};

export default isValidCode;
