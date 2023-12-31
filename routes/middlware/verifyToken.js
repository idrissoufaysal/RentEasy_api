const jwt=require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "secrete", (err, user) => {
            if (err) {
                console.error("JWT Verification Error:", err); // Ajoutez cette ligne
                res.status(403).json("Token is not valid");
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAndAuthotization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("you are not allowed");
        }
    });
};


module.exports= {verifyToken,verifyTokenAndAuthotization};