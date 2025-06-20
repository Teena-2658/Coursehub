import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        // Token fetch karte hain cookies se
        const token = req.cookies.token;

        // Agar token nahi hai
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Token verify karte hain
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Agar token valid nahi hai, jwt.verify automatically error throw karega
        req.id = decoded.userId;  // User ID ko req object me set karna

        // Next function ko call karke request processing continue karte hain
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};
