import {Schema, model} from 'mongoose';

const ComentarioSchema = Schema({
    titular: {
        type: String,
        default: 'Anounymous'
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

ComentarioSchema.pre('save', function (next) {
    if (!this.titular || this.titular.trim() === '') {
        this.titular = 'Anonymous';
    }
    next();
});

export default model('Comentario', ComentarioSchema)