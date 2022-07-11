import config from '../dbconfig.js';
import sql from 'mssql';
// import pelicula from '../models/Pelicula.js'

class peliculaServices {

    getAll = async (titulo,orden)=>{

        let query = `SELECT * FROM Pelicula WHERE 1 = 1`;
        let peliculas = null;


        if (titulo !== undefined) {
            query += ` AND Titulo LIKE '%${titulo}%'`;
        }
        if(orden){
            if(orden != "ASC") orden = "DESC"
            query += `ORDER BY Titulo ${orden}`
        }
        console.log(query);

        try{
            let pool = await sql.connect(config);
            console.log(pool);
            const result = await pool.request()
                                     .query(query);
            peliculas = result.recordsets[0];    
        }catch(error){
            console.log(error);
        }
        return peliculas;
    }

    getPeliculaById = async (id)=>{
        let pelicula = null;
        try {
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                .input ('pId', sql.Int, id)
                                .query (`SELECT 
                                        Pelicula.Imagen AS PeliculaImagen, 
                                        Pelicula.Calificacion AS PeliculaCalificacion, 
                                        Pelicula.FechaCreacion AS PeliculaFechaCreacion, 
                                        Pelicula.Titulo AS PeliculaTitulo, 
                                        Personaje.Edad AS PersonajeEdad, 
                                        Personaje.Historia AS PersonajeHistoria, 
                                        Personaje.Imagen AS PersonajeImagen,
                                        Personaje.Nombre AS PersonajeNombre, 
                                        Personaje.Peso AS PersonajePeso
                                        FROM Pelicula 
                                        INNER JOIN PersonajesXPeliculas
                                        INNER JOIN Personaje
                                        ON Personaje.Id = PersonajesXPeliculas.IdPersonaje
                                        ON Pelicula.Id = PersonajesXPeliculas.IdPelicula
                                        WHERE Pelicula.Id = @pId`);
            pelicula = result.recordsets [0][0];
        } catch (error){
            console.log(error);
        }
        return pelicula;
    }

    insertPelicula = async (pelicula)=>{

        let returnEntity = null;
        // hacer que la fecha creacion se ponga sin el usuario
            try {
                let pool    = await sql.connect(config);
                let result  = await pool.request()
                                    .input ('pImagen', sql.VarChar(150), pelicula.Imagen)
                                    .input ('pTitulo', sql.VarChar(50), pelicula.Titulo)
                                    .input ('pFechaCreacion', sql.Int, pelicula.FechaCreacion)
                                    .input ('pCalificacion', sql.Float, pelicula.Calificacion)
                                    .query (`INSERT INTO Pelicula (Imagen, Titulo, FechaCreacion, Calificacion)
                                            VALUES (@pImagen, @pTitulo, @pFechaCreacion, @pCalificacion)`);
                returnEntity = result.recordsets;
            }
            catch(error){
                console.log(error);
            }
            return returnEntity;
    }

    updatePelicula = async (pelicula)=>{
        let returnEntity = null;
        try{
            let pool    = await sql.connect(config);
            let result  = await pool.request()
                                    .input ('pId', sql.Int, pelicula.Id)
                                    .input ('pImagen', sql.VarChar(150), pelicula.Imagen)
                                    .input ('pTitulo', sql.VarChar(50), pelicula.Titulo)
                                    .input ('pFechaCreacion', sql.Int, pelicula.FechaCreacion)
                                    .input ('pCalificacion', sql.Float, pelicula.Calificacion)
                                    .query ('UPDATE Pelicula SET Imagen = @pImagen, Titulo = @pTitulo, FechaCreacion = @pFechaCreacion, Calificacion = @pCalificacion WHERE Id = @pId');
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
                                        .query("DELETE FROM Pelicula WHERE Id=@pId");
            rowsAffected = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return rowsAffected;
    }
}

export default peliculaServices;