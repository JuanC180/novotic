import jwt from "jsonwebtoken";
import Cliente from "../models/Cliente.js";

const checkAuth = async (req, res, next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // console.log('Si tiene el token con bearer')

        try {
            token = req.headers.authorization.split(' ')[1];
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.cliente = await Cliente.findById(decoded.id).select("-password -token -confirmado")
            
            return next()
        } catch (error) {
            const error1 = new Error("Token no válido")
            return res.status(403).json({ msg: error1.message })
        }
    }

    if(!token){
        const error = new Error("Token no válido o inexistente")
        res.status(403).json({ msg: error.message })
    }
    next();
}

export default checkAuth;