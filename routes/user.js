const {Router} =require("express");
const User=require('../model/user')
const router = Router();

router.get('/singin',(req,res)=>{
   return res.render('singin');
});

router.get('/singup',(req,res)=>{
    return res.render('singup');
});

router.post('/singup',async (req,res)=>{
    try {
        const {fullName,email,password}=req.body;
        console.log('Form data received:', {fullName, email, password});
        
        const user= await User.create({
            fullName,
            email,
            password,
        });
        console.log('User created:', user);
        return res.redirect("/");
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Error creating user: ' + error.message);
    }
});

router.post('/singin', async (req,res)=>{
    try{
    const {email,password}=req.body;
   const token =await User.matchPasswordAndGenerateToken(email,password);

   console.log("token",token);
   return res.cookie('token',token).redirect('/');
    }
    catch(error){
        return res.render('singin',{
            error:'incorrect email or password',
        });
    }
});

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect("/");
})

module.exports =router;