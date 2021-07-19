import PersonasModel from "../models/Personas.model.js"

export const validacionPersona = (req, res, next) => {
    try{
        let datos = req.body;
        const { id } = req.params;

        const persona = new PersonasModel({...datos});

        validarCampo("nombre", persona.nombre);
        validarCampo("apellido", persona.apellido);
        validarCampo("email", persona.email);
        validarCampo("telefono", persona.telefono);

        if(typeof id === "undefined" && req.method === "POST"){
            console.log("Registro nuevo verificar email")
            validarCorreoUnico(persona.email);
        }

        next();
        
    } catch(error){
        res.status(400).json({
            estado: false,
            error: true,
            mensaje: error.message
        })
    }

}

const validarCorreoUnico = async (email) => {
        
    const emailExiste = await PersonasModel.findOne({email});

    if(emailExiste){
        throw new Error("Email ya existe");
    }
}

const validarCampo = (llave, valor) => {
    if(typeof valor === "undefined" || valor === ""){
        throw new Error(`Campo ${llave} es requerido.`);
    }
}