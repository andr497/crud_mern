import mongoose from 'mongoose';
import PersonasModel from '../models/Personas.model.js';

export const obtener = async (req, res) => {
    try{
        const personas = await PersonasModel.find();

        res.status(200).json({
            estado: true,
            datos: personas
        })

    } catch(error){
        res.status(500).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }
}

export const guardar = async (req, res) => {
    try{
        const persona = req.body;

        const nuevaPersona = await PersonasModel.create({...persona});
        
        res.status(200).json({
            estado: true,
            datos: nuevaPersona
        })
        
    } catch(error){
        res.status(500).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }
}

export const editar = async(req, res) => {
    try {
        const { id: _id } = req.params;
        const persona = req.body;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw new Error('No existe una persona con ese id');
        }

        const existePersona = await PersonasModel.findById({_id})

        if(!existePersona){
            throw new Error('No existe la persona');
        }

        const personaActualizada = await PersonasModel.findByIdAndUpdate(_id, {...persona, _id}, { new: true });

        res.status(200).json({
            estado: true,
            datos: personaActualizada,
            mensaje: "Datos actualizados con exito."
        })


    } catch (error) {
        res.status(500).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }
}

export const borrar = async(req, res) => {

    try {
        const { id: _id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw new Error('ID no es válido.');
        }

        const existePersona = await PersonasModel.findById({_id})

        if(!existePersona){
            throw new Error('No existe la persona');
        }

        const personaBorrada = await PersonasModel.findByIdAndDelete(_id);

        res.status(200).json({
            estado: true,
            datos: personaBorrada,
            mensaje: "Datos eliminados con exito."
        })


    } catch (error) {
        res.status(500).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }
}