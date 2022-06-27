import config from '../dbconfig.js';
import sql from 'mssql';
// import pelicula from '../models/Pelicula.js'

class peliculaServices {

    getAll = async ()=>{
        let peliculas = null
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
                                     .query('SELECT * FROM Pelicula');
            peliculas = result.recordsets;    
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
                                .query ('SELECT * FROM Pelicula WHERE id = @pId');
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
                                    .input ('pId', sql.Int, pelicula.id)
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