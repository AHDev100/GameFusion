import express, { Express, Request, Response } from 'express';
require('dotenv').config(); 

const app : Express = express();
const port = 8000;
const apiKey = process.env.RAWG_API_KEY; 

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});