import {Schema, model} from 'mongoose';

const ComentarioSchema = Schema({
    titular: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,
    versionKey: false
})

export default model('Comentario', ComentarioSchema)