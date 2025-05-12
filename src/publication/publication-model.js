import {Schema, model} from 'mongoose';


const PublicationSchema = Schema({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    course: {
        type: String,
        enum: ['Taller', 'Tecnologia', 'Practica Supervisada'],
        required: [true, 'El curso es requerido']
    },
    texto: {
        type: String,
        required: [true, "El texto es obligatorio"]
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario'
    }],
    state: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
});

export default model('Publication', PublicationSchema)