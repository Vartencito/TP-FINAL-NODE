import express, { request } from 'express'
import peliculaController from './src/controllers/peliculaController.js'
import personajeController from './src/controllers/personajeController.js'
import usersController from './src/controllers/usersController.js'
import jwt from "jsonwebtoken"

const app = express();
const port = 3001;

app.set('port', port);
app.listen(app.get('port'));

console.log("server en el puerto: ",app.get('port'));

// const takeToken =(req, res, next)=>{
//     const bearerHeader = req.headers['authorization'];
//     console.log("estoy aca")
//     if(typeof bearerHeader === 'undefined'){

//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else{
//         res.sendStatus(403)
//     }
// }

const verifyToken =(req,res,next)=>{
    console.log(req.token)
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
        if(err) {
            res.sendStatus(403);
        } else{
            res.json({
                authData
            })
            next();
        }
    })
}

app.use(express.json());
app.use("/movies", verifyToken, peliculaController);
app.use("/characters", verifyToken,personajeController);
app.use("/auth/login", usersController);
app.use(express.urlencoded({ extended: false }));


export default app;