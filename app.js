import express from 'express'
import peliculaController from './src/controllers/peliculaController.js'
import personajeController from './src/controllers/personajeController.js'
import jsonwebtoken from 'jsonwebtoken';

const app = express();

const port = 3001;

const jwt = jsonwebtoken();

app.set('port', port);
app.listen(app.get('port'));

console.log("server en el puerto: ",app.get('port'));

app.use(express.json());



app.use("/movies", peliculaController);
app.use("/characters", personajeController);
// app.use(express.urlencoded({ extended: false }));

export default app;