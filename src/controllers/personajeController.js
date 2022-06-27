import { Router } from "express";
import PersonajeServices from "../services/personajeServices.js";
import Personaje from '../models/Personaje.js'

const router = Router();
const personajeServices = new PersonajeServices();
const personaje = new Personaje();

router.get('', async(req,res)=>{
    try{
        const personaje = await personajeServices.getAll();
        return res.status(200).json(personaje);
    } catch (error){
        return res.status(400).send('error en el server');
    }
});

router.get('/:id', async (req,res)=>{
    try{

        const {
            id
        } = req.params;
        const personaje = await personajeServices.getPersonajeById(id);
        return res.status(200).json(personaje);
    
    } catch (error) {
        return res.status(400).send('error en el server');
    }
});

router.post('/:id', async (req,res)=>{

    try{
        const personaje = req.body;
        const personajeInsert = personajeServices.insertPersonaje(personaje);
        return res.status(200).json(personajeInsert);  
    } catch (error) {
        return res.status(400).send('error en el server');
    }
    
});

router.put('/:id',async(req,res)=>{
    try{
        const personaje = req.body;
        const personajeUpdate = await personajeServices.updatePelicula(personaje);
        return res.status(200).json(personajeUpdate);
    } catch (error){
        return res.status(400).send('error en el server');
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personajeDelete = await personajeServices.deleteById(req.params['id']);
        return res.status(200).send('Se borro');
    }catch(error){
        return res.status(400).send('error en el server');
    }
    
})

export default router;