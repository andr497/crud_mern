import express from 'express';
import { obtenerPersona, guardarPersona, editarPersona, borrarPersona } from '../controller/persona.controller.js';

const router = express.Router();

router.get('/obtenerPersona', obtenerPersona);
router.post('/guardarPersona', guardarPersona);
router.put('/editarPersona/:id', editarPersona);
router.delete('/borrarPersona/:id', borrarPersona);

export default router;