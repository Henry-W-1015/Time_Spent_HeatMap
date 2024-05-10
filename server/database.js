//import { readFile, writeFile } from 'fs/promises';
import pg from 'pg';

const heatMap = new pg.Pool({
    user: 'vsujqmjk',
    host: 'otto.db.elephantsql.com',
    database: 'vsujqmjk',
    password: 'x7OtYep17xB7i1OlouzAOFDk7vTmTqR5',
    port: 5432,
  });

await heatMap.connect((err, client, done) => {
    if (err) {
      console.error('Error connecting to the database', err);
      return;
    }
    console.log('Connected to the database');

});



export async function readData(name, week, response){
    try {
        
        let retrievedData = undefined;
        const selectQuery = `SELECT mapdata FROM heatMap where user_name='${name}' and week_number=${week}`;

        if(name === 'any' && week === 'x'){
            selectQuery = `SELECT * FROM heatMap`;
        }
        heatMap.query(selectQuery, (err, result) => {
            if (err) {
            console.error('Error executing query', err);
            //   return;
            response.status(500).send('Internal Server Error');
            }
            // Result.rows contains the retrieved data
            retrievedData = result.rows;
            //console.log(retrievedData)
            //console.log(retrievedData);
            response.status(200).json(retrievedData);
            //heatMap.end();
            })
    } catch (error) {
            response.status(500).json(error);
    }
        
    // return retrievedData;
};




export async function createInstance(name, week, data, response){
    try {

        if (name === ''|| week === '') {
            throw "name or week is empty";
        }
        const sql = `INSERT INTO heatMap (user_name, week_number, mapdata) VALUES ('${name}', ${week}, '${data}');`
        await heatMap.query(sql, (err, result) =>{
            if (err) {
                // throw err;
                response.status(403).json({ 'status': 'Database Error' });}
            else{
                response.status(200).json({ 'status': 'Instance Created' })
            }
        })
        

        // heatMap.end();
    } catch (error) {
        console.log(error);
    }

}

export async function updataInstance(name, week, data, response){
    try {

        if (name === ''|| week === '') {
            throw "name or week is empty";
        }
        
        const sql = `UPDATE heatMap SET mapdata='${data}' where user_name='${name}' and week_number=${week};`;
        await heatMap.query(sql, (err, result) =>{
            if (err) {
                // throw err;
                response.status(403).json({ 'status': 'Database Error' });}
            else{
                response.status(200).json({ 'status': 'Update success' })
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export async function deleteInstance(name, week, response){
 try{
        if (name === ''|| week === '') {
            throw "name or week is empty";
        }
        const sql = `delete from heatMap where user_name = '${name}' and week_number = ${week};`
        await heatMap.query(sql, (err, result) =>{
            if (err) {
                // throw err;
                response.status(403).json({ 'status': 'Database Error' });}
            else{
                
                response.status(200).json({ 'status':  'Data deleted'  })
            }
        })

        // heatMap.end();
    } catch (error) {
        console.log(error);
    }
}
export async function dumpCounters(response) {
    //await reload(JSONfile);
    
  }


