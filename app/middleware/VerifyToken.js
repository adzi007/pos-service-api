import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log("proses verify");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("authHeader", authHeader);
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })

    // console.log("verify", verify);
}