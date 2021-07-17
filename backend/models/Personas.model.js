import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "Se require nombre"]
    },
    apellido: {
        type: String,
        required: [true, "Se require apellido"]
    },
    email: {
        type: String,
        required: [true, "Se require email"]
    },
    telefono: {
        type: String,
        required: [true, "Se require telefono"]
    }

});

export default mongoose.model('persona', personaSchema);