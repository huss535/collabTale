
import express, { Express, Request, Response, Application } from 'express';
import { config } from './firebase';
import dotenv from 'dotenv';
const cors = require('cors');
const story = require("./routes/storyDB");
const user = require("./routes/userDB")
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/firestore', story);
app.use('/user', user);
app.get("/", (req: Request, res: Response) => { res.send("Express + ts server") })
app.get("/firebaseConfig", (req: Request, res: Response) => { res.send(config); })
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});