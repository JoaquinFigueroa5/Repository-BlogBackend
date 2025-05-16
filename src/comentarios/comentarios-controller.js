import Publication from "../publication/publication-model.js";
import Comentario from "./comentarios-model.js";

export const updateComent = async(req, res) => {
    try {
        const { id } = req.params;
        const { titular, comentario, post } = req.body;

        const postValidate = await Publication.findById(post);

        const publi = await Publication.findById(id);
        if (!publi || !postValidate) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }


        const newComment = await Comentario.create({
            titular,
            comentario,
            post
        });        

        publi.comentarios.push(newComment);

        
        await publi.save();

        
        const savedPubli = await Publication.findById(id)
            .populate({
                path: "comentarios"
            })

        res.status(200).json({
            success: true,
            msg: "Comentario agregado",
            publi: savedPubli
        })
        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al subir el comentario"
        })
    }
}

export const editarComentario = async(req, res) => {
    try {
        const { id } = req.params;
        const { _id, comentario, ...data} = req.body;
        
        const comment = await Comentario.findByIdAndUpdate(id, data, {new: true})

        comment.comentario = comentario;
        await comment.save()

        res.status(200).json({
            success: true,
            msg: "Comentario actualizado",
            comment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el comentario",
            error: error.message || error
        })
    }
}

export const deleteComment = async(req, res) => {
    const { id } = req.params;
    
    try {
        const comment = await Comentario.findById(id);

        await Publication.findByIdAndUpdate(
            comment.post,
            {$pull: {comentarios: id}}
        )

        await Comentario.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Comentario eliminado con exito!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar el comentario",
            error: error.message || error
        })
    }
}

export const getComments = async(req, res) => {
    const query = { state: true };

    try {
        const [total, comments] = await Promise.all([
            Comentario.countDocuments(query),
            Comentario.find(query).sort({ createdAt: -1 })
            .populate({
                path: 'post'
            })

        ])

        return res.status(200).json({
            success: true,
            msg: 'Comentarios obtenidas con exito',
            total,
            comments
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error al obtener comentarios',
            error: error.message || error
        })
    }
}
