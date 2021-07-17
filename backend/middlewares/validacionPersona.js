import PersonasModel from "../models/Personas.model.js"
import Assert from 'assert';

export const validacionPersona = async (req, res, next) => {
    try{
        const datos = req.body;

        const persona = new PersonasModel({...datos});

        const emailExiste = await PersonasModel.findOne({email: persona.email});

        if(emailExiste){
            throw new Error("Email ya existe");
        }

        next();
        
    } catch(error){
        res.status(500).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }

}