import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findByUsername } from '../utils/db.js';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const loginController = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({
            error: "Username and Password are required"
        });
    };

    const user = findByUsername(username);
    if(!user) {
        return res.status(401).json({
            error: "Invalid username or password."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({
            error: "Invalid username or password."
        });
    };

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role
        },
            jwtSecret,
        {
            expiresIn: "1d"
        }
    )
    
    return res.status(200).json({
        message: "User logged in successfully",
        token
    })

}