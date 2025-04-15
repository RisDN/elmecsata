const regex = /^[a-zA-Z0-9]{3,15}$/;
export const validateUsername = (username: string) => {
    return regex.test(username);
};
