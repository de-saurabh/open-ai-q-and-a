import jwt from 'jsonwebtoken';

export class AuthHelper {
    private email: string;
    constructor(email: string) {
        this.email = email;
    }
    generateToken() {
        try {
            const jwtSecret = process.env.JWT_SECRET || 'secret';
            const jwtExpiration = `${Number(process.env.JWT_EXPIRATION) || 10}s`;
            const data = { email: this.email };
            return jwt.sign(data, jwtSecret, {expiresIn: jwtExpiration});
        } catch (error) {
            throw error;
        }
}
generateRefreshToken() {
        try {
            const jwtSecret = process.env.JWT_REFRESH_SECRET || 'refreshsecret';
            const jwtExpiration = `${(Number(process.env.JWT_EXPIRATION) || 10) * 2}s`;
            const data = { email: this.email };
            return jwt.sign(data, jwtSecret, {expiresIn: jwtExpiration});
        } catch (error) {
            throw error;
        }
}

}