import config from '../dbconfig.js';
import sql from 'mssql';
// import personaje from '../models/Personaje.js'

class personajeServices {


    // SELECT * 
    // FROM Personaje
    // INNER JOIN PersonajesXPeliculas ON Personaje.Id = PersonajesXPeliculas.IdPersonaje
    // INNER JOIN Pelicula ON Pelicula.Id = PersonajesXPeliculas.IdPelicula
    // WHERE 1=1
    // AND Personaje.Edad = 18
    // AND Personaje.Nombre like 'A%'
    // and Pelicula.Titulo like 'A%'

    //poner las querys de pelicula services y de personaje services

    getAll = async (edad, nombre, movieTitle) => {

        let personajes = null
        let query = `SELECT Personaje.*, Pelicula.Titulo FROM Personaje INNER JOIN PersonajesXPeliculas ON Personaje.Id = PersonajesXPeliculas.IdPersonaje INNER JOIN Pelicula ON Pelicula.Id = PersonajesXPeliculas.IdPelicula WHERE 1=1 `;


        if (movieTitle) {
            query += `AND  Titulo LIKE '${movieTitle}%'`;
        }
        if (edad) {
            query += `AND  Edad = ${edad}`;
        }
        if (nombre) {
            query += `AND  Nombre LIKE '${nombre}%'`;
        }

        try {
            let pool = await sql.connect(config);
            const result = await pool.request()
                .query(query);
            personajes = result.recordsets;
        } catch (error) {
            console.log(error);
        }
        return personajes;
    }

    getPersonajeById = async (id) => {
        let personaje = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query(`SELECT 
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
            personaje = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return personaje;
    }

    insertPersonaje = async (personaje) => {

        let returnEntity = null;
        // hacer que la fecha creacion se ponga sin el usuario
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImagen', sql.VarChar(150), personaje.Imagen)
                .input('pNombre', sql.VarChar(50), personaje.Nombre)
                .input('pEdad', sql.Int, personaje.Edad)
                .input('pPeso', sql.Float, personaje.Peso)
                .input('pHistoria', sql.VarChar(350), personaje.Historia)
                .query(`INSERT INTO Personaje (Imagen, Nombre, Edad, Peso, Historia)
                                            VALUES (@pImagen, @pNombre, @pEdad, @pPeso, @pHistoria)`);
            returnEntity = result.recordsets;
        }
        catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    updatePersonaje = async (personaje) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, personaje.Id)
                .input('pImagen', sql.VarChar(150), personaje.Imagen)
                .input('pNombre', sql.VarChar(50), personaje.Nombre)
                .input('pEdad', sql.Int, personaje.Edad)
                .input('pPeso', sql.Float, personaje.Peso)
                .input('pHistoria', sql.VarChar(350), personaje.Historia)
                .query('UPDATE Personaje SET Imagen = @pImagen, Nombre = @pNombre, Edad = @pEdad, Peso = @pPeso, Historia = @pHistoria WHERE Id = @pId');
            returnEntity = result.recordsets;
        }
        catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    deleteById = async (Id) => {
        let rowsAffected = 0;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, Id)
                .query("DELETE FROM Personaje WHERE Id=@pId");
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default personajeServices;