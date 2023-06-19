const {verifyToken} = require('../helpers/jwt.helper');

const authenticated = async(req,res,next) =>{
    try{
        if(!req.headers.authorization){
            return res.status(401).json({
                status: False,
                statusCode: 401, 
                message: "Access token not found"
            });
        }

        const token = req.headers.authorization.split(" ");
        req.user = await verifyToken(token[1].trim());
        next();
    }
    catch(error){
        next(error);
    }
};

const adminAuthenticated = async(req,res,next) =>{
    try{
        if(!req.headers.authorization){
            return res.status(401).json({
                status: False,
                statusCode: 401,
                message: "Access token not found"
            });
        }

        const token = req.headers.authenticated.split(" ");
        req.user = await verifyToken(token[1].trim());

        if(req.user.role!='admin'){
            return res.status(401).json({
                status: False,
                statusCode: 401,
                message: "Access denied"
            });
        }
        next();
    }
    catch(error){
        next(error);
    }
};

//Grant access to specific roles

const authorize = (...roles) =>{
    return (res,req,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                status: False,
                statusCode: 401,
                mesaage: "Access denied"
            });
        }
        next();
    };
};

module.exports = {authenticated,adminAuthenticated,authorize};