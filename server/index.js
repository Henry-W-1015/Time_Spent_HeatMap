import * as database  from './database.js';

import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/client', express.static('client'));


app.get('/read', async (request, response) => {
    const options = request.query;
    await database.readData(options.name, options.week, response);
    //response.status(200);
  });
  
app.post('/create?', async (request, response) => {
    try {
      const options = request.body; //{    name: , week: , data: }
      await database.createInstance(options.name, options.week, options.data, response);
    //   response.status(200).json({  "status": "success" });
    } catch (error) {
      console.log(error);
      response.status(400).json({  "status": "Bad request" });
    }
  });
  
app.put('/update', async (request, response) => {
    try {
        const options = request.body;
        await database.updataInstance(options.name, options.week, options.data, response);
        
    } catch (error) {
        console.log(error);
        response.status(400).json({  "status": "Bad request" });
    }

  });
  
app.delete('/delete', async (request, response) => {
    const options = request.query;
    await database.deleteInstance( options.name, options.week, response);
});



// app.get('/dump', async (request, response) => {
//     const options = request.body;
//     //dumpCounters(response);
// });

app.get('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});


app.listen(port, () => {
    const msg = `Server started on http://localhost:${port}`;
    console.log(msg);
  });