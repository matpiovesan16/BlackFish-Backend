var pool = require('./bd');

async function getPrecios(){
   
        var query = 'select * from precios';
        var rows = await pool.query(query);
        return rows;
  
}

async function getPrecioById(ID){
   
    var query = 'select * from precios where id = ?';
    var rows = await pool.query(query,[ID]);
    return rows;

}


async function insertPrecios(obj){
    try{
        var query = 'insert into precios set ?';
        var rows = await pool.query(query, [obj])
        return rows;
    }catch(error){
        console.log(error);
        throw error;
    }

}

async function deletePrecioById(ID){
    var query = 'delete from precios where id = ?';
    var rows = await pool.query(query, [ID]);
    return rows;
}

async function updatePreciosById(ID){
    var query = 'select * from precios where id = ?';
    var rows = await pool.query(query, [ID]);
    return rows;
}

async function modPreciosById(obj,ID){
    try{
        var query = 'update precios set ? where id = ?';
        var rows = await pool.query(query, [obj,ID]);
        return rows;
    }catch(error){
        throw error;
    }
}

module.exports = {getPrecios, getPrecioById, insertPrecios, deletePrecioById, updatePreciosById, modPreciosById}