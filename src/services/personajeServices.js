import config from '../dbconfig.js';
import sql from 'mssql';
// import personaje from '../models/Personaje.js'

class personajeServices {

    getAll = async ()=>{
        let personajes = null
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
            .query('SELECT * FROM Personaje');
            personajes = result.recordsets;    
        }catch(error){
            console.log(error);
        }
        return personajes;
    }

    getPersonajeById = async (id)=>{
        let personaje = null;
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                .input ('pId', sql.Int, id)
                                .query (`SELECT 
                                        Personaje.Edad AS EdadPersonaje, 
                                        Personaje.Historia AS HistoriaPersonaje,
                                        Personaje.Imagen AS ImagenPersonaje,
                                        Personaje.Nombre AS NombrePersonaje,
                                        Personaje.Peso AS PesoPersonaje,
                                        Pelicula.Calificacion AS CalificacionPelicula,
                                        Pelicula.FechaCreacion AS FechaCreacionPelicula,
                                        Pelicula.Imagen AS ImagenPelicula,
                                        Pelicula.Titulo AS TituloPelicula
                                        FROM Personaje
                                        INNER JOIN PersonajesXPeliculas
                                        INNER JOIN Pelicula
                                        ON Pelicula.Id = PersonajesXPeliculas.IdPelicula
                                        ON Personaje.Id = PersonajesXPeliculas.IdPersonaje
                                        WHERE Personaje.Id=@pId`);
            personaje = result.recordsets [0][0];
        } catch (error){
            console.log(error);
        }
        return personaje;
    }

    insertPersonaje = async (personaje)=>{

        let returnEntity = null;
        // hacer que la fecha creacion se ponga sin el usuario
            try {
                let pool    = await sql.connect(config);
                let result  = await pool.request()
                                    .input ('pImagen', sql.VarChar(150), personaje.Imagen)
                                    .input ('pNombre', sql.VarChar(50), personaje.Nombre)
                                    .input ('pEdad', sql.Int, personaje.Edad)
                                    .input ('pPeso', sql.Float, personaje.Peso)
                                    .input ('pHistoria', sql.VarChar(350), personaje.Historia)
                                    .query (`INSERT INTO Personaje (Imagen, Nombre, Edad, Peso, Historia)
                                            VALUES (@pImagen, @pNombre, @pEdad, @pPeso, @pHistoria)`);
                returnEntity = result.recordsets;
            }
            catch(error){
                console.log(error);
            }
            return returnEntity;
    }

    updatePersonaje = async (personaje)=>{
        let returnEntity = null;
        try{
            let pool    = await sql.connect(config);
            let result  = await pool.request()
            .input ("pId", sql.Int, personaje.Id)
            .input ('pImagen', sql.VarChar(150), personaje.Imagen)
            .input ('pNombre', sql.VarChar(50), personaje.Nombre)
            .input ('pEdad', sql.Int, personaje.Edad)
            .input ('pPeso', sql.Float, personaje.Peso)
            .input ('pHistoria', sql.VarChar(350), personaje.Historia)
            .query ('UPDATE Personaje SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia = @pHistoria WHERE Id = @pId');
                returnEntity = result.recordsets;
        }
        catch(error){
            console.log(error);
        }
        return returnEntity;
    }

    deleteById= async (Id)=>{
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                        .input('pId', sql.Int, Id)
                                        .query("DELETE FROM Personaje WHERE Id=@pId");
            rowsAffected = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return rowsAffected;
    }
}

export default personajeServices;