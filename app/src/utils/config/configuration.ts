export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    auth: {
        secretKey: process.env.SECRET_KEY,
        expiresIn: process.env.EXPIRES_IN
    }
});
