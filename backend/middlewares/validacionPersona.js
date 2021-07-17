import PersonasModel from "../models/Personas.model.js"

export const validacionPersona = (req, res, next) => {
    try{
        const datos = req.body;

        const persona = new PersonasModel({...datos});

        validarCampo("nombre", persona.nombre);
        validarCampo("apellido", persona.apellido);
        validarCampo("email", persona.email);
        validarCampo("telefono", persona.telefono);

        validarCorreoUnico();

        next();
        
    } catch(error){
        res.status(500).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }

}

export const validarCorreoUnico = async () => {
        
    const emailExiste = await PersonasModel.findOne({email: persona.email});

    if(emailExiste){
        throw new Error("Email ya existe");
    }
}

const validarCampo = (llave, valor) => {
    if(typeof valor === "undefined"){
        throw new Error(`Campo ${llave} es requerido.`);
    }
}