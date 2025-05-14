import { Router } from 'express';
import { check } from 'express-validator';
import { updateComent, editarComentario, deleteComment, getComments } from '../comentarios/comentarios-controller.js'
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/', getComments)

router.put(
    '/:id',
    [
        validarCampos
    ],
    updateComent
)

router.put(
    '/editar/:id',
    [
        validarCampos
    ],
    editarComentario
)

router.delete(
    '/:id',
    [
        validarCampos
    ],
    deleteComment
)

export default router;