import express from 'express';
import { obtener, guardar, editar, borrar } from '../controller/persona.controller.js';
import { validacionPersona } from '../middlewares/validacionPersona.js';

const router = express.Router();

router.get('/obtener', obtener);
router.post('/guardar', validacionPersona, guardar);
router.put('/editar/:id', editar);
router.delete('/borrar/:id', borrar);

router.get('*', function(req, res){
    res.status(404).json({
        estado: false,
        error: true,
        mensaje: "Pagina no encontrada"
    })
})

export default router;