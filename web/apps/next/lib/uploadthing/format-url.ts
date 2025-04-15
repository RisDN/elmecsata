export const DEFAULT_IMAGE = 'https://i.imgur.com/5U5IcGA.jpeg';

export const fromKey = (key: string): string => {
    if (key === null || key === undefined || key === '') {
        return DEFAULT_IMAGE;
    }

    return `https://${process.env.NEXT_PUBLIC_UPLOADTHING_PROJECTID}.utfs.io/f/${key}`;
};
