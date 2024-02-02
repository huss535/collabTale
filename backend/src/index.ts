
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
const cors = require('cors');
const database = require("./routes/database");
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/firestore', database);

app.get("/", (req: Request, res: Response) => { res.send("Express + ts server") })
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});