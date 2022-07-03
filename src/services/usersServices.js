import config from '../dbconfig.js';
import sql from 'mssql';

class usersServices{

    searchUser = async (username, password) =>{
        let user = null;
        try{
            let pool = await sql.connect(config);
            const result = await pool.request()
                                    .input ('pUsername', sql.VarChar(50), username)
                                    .input ('pPassword', sql.Int, password)
                                    .query('SELECT * FROM Users WHERE username = @pUsername AND password = @pPassword');
            user = result.recordsets[0];   
            if(user.length == 0) return user = null;
        } catch(e){
            console.log(e);
        }
        return user;
    }
}

export default usersServices;