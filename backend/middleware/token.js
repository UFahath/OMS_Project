import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;
    console.log("auth", auth);

    if (!auth) {
        return res.status(401).json({ msg: "No token provided" });
    }
    
    if (auth.split(" ").length !== 2 || auth.split(" ")[0] !== "Bearer") {
        return res.status(401).json({ msg: "Invalid token format" });
    }

    try {
        const token = auth.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("decoded data", decoded);
        req.user = decoded;          // {userid: , role: , token: }
        return next();
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorised user" })
    }

}

export default verifyToken