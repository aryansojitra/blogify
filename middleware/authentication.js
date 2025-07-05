const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies["token"];

        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayLoad = validateToken(tokenCookieValue);
            req.user = userPayLoad;
        }
        catch(error){}
        
        next();
    }
}

module.exports={
    checkForAuthenticationCookie,
}