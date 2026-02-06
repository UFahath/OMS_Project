import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const { token } = req.headers;
    try {
        const decoded = jwt.verify(token, "key123");
        console.log("decoded data",decoded);
        next();
    } catch (error) {
        return res.status(401).json({ msg: "unauthorised user" })
    }
 
}
 
export default verifyToken