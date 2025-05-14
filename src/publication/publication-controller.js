import Publication from './publication-model.js';
import Comentario from '../comentarios/comentarios-model.js';

export const savePublication = async(req, res) => {
    try {

        const data = req.body;

        const publication = new Publication({
            ...data
        })

        await publication.save();
        
        res.status(200).json({
            success: true,
            msg: 'Publication added successfully',
            publication
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al subir la publicacion",
            error
        })
    }
}

export const getPublications = async(req = request, res = response) => {
    const { limit = 10, desde = 0 } = req.query;
    const query = { state: true };

    try {
        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limit))
                .populate('comentarios')
        ])

        return res.status(200).json({
            success: true,
            msg: "Publicaciones obtenidas con exito",
            total,
            publications
        })
    } catch (error) {
        console.error("Error al obtener publicaciones:", error);
        return res.status(500).json({
            success: false,
            msg: "Error al obtener las publicaciones",
            error: error.message || error
        })
    }
}

export const eliminarPubli = async(req, res) => {
    try {
        const { id } = req.params;
        
        const publi = await Publication.findById(id);

        if (!publi) {
            return res.status(404).json({
                success: false,
                msg: "Publicación no encontrada"
            });
        }

        
        if (Array.isArray(publi.comentarios) && publi.comentarios.length > 0) {
            const comentarioIds = publi.comentarios.map(c => c._id);
            await Comentario.deleteMany({ _id: { $in: comentarioIds } });
        }

        await Publication.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Publicacion eliminada",
            publi
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar la publicacion"
        })
    }
}

export const updatePubli = async(req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data } = req.body;

        const publi = await Publication.findByIdAndUpdate(id, data, {new: true})
        .populate({
            path: "comentarios",
            select: "titular comentario -_id",
            populate: {
                path: "titular",
                select: "username -_id"
            }
        })
        .populate("categoria", "categoria -_id")
        .populate("titular", "username -_id");

        res.status(200).json({
            success: true,
            msg: "Publicacion actualizada",
            publi
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar la publicacioN",
            error: error.message || error
        })
    }
}