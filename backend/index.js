import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// * Importar rutas en este archivo

import personaRouter from './routes/personas.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api', personaRouter);

const CONNECTION_URL="mongodb://localhost:27017/crud_mern";
const PORT = 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
}).catch((error) => {
    console.log(error);
});

mongoose.set('useFindAndModify', false)


