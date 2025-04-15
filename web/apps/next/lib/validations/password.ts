// Minimum 8 karakter
// Minimum egy szám
// Minimum egy kis betű
// Minimum egy nagy betű

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const validatePassword = (password: string) => {
    return regex.test(password);
};
