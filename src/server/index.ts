import 'dotenv/config';
import express from 'express';
import { router } from './routes';

const port = Number(process.env.PORT) || 3000;
const basename = '/hw/store';

const app = express();

app.use(express.json());
app.use(basename, router);
app.use(basename, express.static('dist'));

app.listen(port, '::', () => {
    console.log(`set BUG_ID = ${process.env.BUG_ID}` + `\nhttp://localhost:${port}${basename}`);
});