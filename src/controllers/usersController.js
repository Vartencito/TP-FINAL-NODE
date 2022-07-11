import { Router } from "express";
import jwt from "jsonwebtoken"
import usersServices from "../services/usersServices.js";

const router = Router();
const user = new usersServices();

router.post('', async (req, res) => {
    try{
        console.log(req.body);
        const {username,password} = req.body;
        console.log(username);
        const userToken = await user.searchUser(username, password);
        if(userToken == null) {
            return res.status(404).send('usuario o contraseña incorrectos');
        }
        jwt.sign({user: userToken},'secretkey',  {expiresIn: '2000s'},(err, token)=>{
            res.json({
                token: token
            })
        })
    } catch(error){
        console.log(error);
    }
})

export default router;