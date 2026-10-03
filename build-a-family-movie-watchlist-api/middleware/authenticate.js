import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "No token provided."
        })
    };

    const token = authHeaders.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token."
        })
    };

}