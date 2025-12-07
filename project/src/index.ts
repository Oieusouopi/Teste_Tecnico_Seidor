import express, { Request, Response } from 'express';
import router from './router/router';

const PORT = 3000;

const app = express();

app.use(express.json())

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello Rafael");
});

app.use(router);

app.listen(PORT, () => {
    console.log("Server ruuning at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
})