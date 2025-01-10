import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
    return jwt.sign({ id, isAdmin: false }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
}