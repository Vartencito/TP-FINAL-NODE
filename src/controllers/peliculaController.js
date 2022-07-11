import { Router } from "express";
import PeliculaServices from "../services/peliculaServices.js";
import Pelicula from '../models/Pelicula.js'

const router = Router();
const peliculaServices = new PeliculaServices();
const pelicula = new Pelicula();

router.get('', async(req,res)=>{

    const titulo = req.query.titulo;

    try{
        
        const pelicula = await peliculaServices.getAll(titulo);
        console.log("a");
        return res.status(200).json(pelicula);
    
    } catch (error){
        console.log(error);
        return res.status(400).send(error);
    }
});

router.get('/:id', async (req,res)=>{
    try{
        // const {
        //     id
        // } = req.params;
        const pelicula = await peliculaServices.getPeliculaById(req.params.id);
        return res.status(200).json(pelicula);
    
    } catch (error) {
        return res.status(400).send('error en el server');
    }
});

router.post('', async (req,res)=>{
    try{
        const pelicula = req.body;
        const peliculaInsert = peliculaServices.insertPelicula(pelicula);
        return res.status(200).json(peliculaInsert);  
    } catch (error) {
        return res.status(400).send('error en el server');
    }
});

router.put('/:id',async(req,res)=>{
    try{
        let pelicula = req.body;
        const peliculaUpdate = await peliculaServices.updatePelicula(pelicula);
        return res.status(200).json(peliculaUpdate);
    } catch (error){
        return res.status(400).send('error en el server');
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const pizzaDelete = await peliculaServices.deleteById(req.params['id']);
        return res.status(200).send('Se borro');
    }catch(error){
        return res.status(400).send('error en el server');
    }
    
})



export default router;