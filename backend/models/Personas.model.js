import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }

});

export default mongoose.model('persona', personaSchema);