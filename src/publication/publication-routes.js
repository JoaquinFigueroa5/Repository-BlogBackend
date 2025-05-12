import { Router } from 'express';
import { check } from 'express-validator';
import { savePublication, getPublications, eliminarPubli, updatePubli } from './publication-controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
    '/submit',
    [
        validarCampos
    ],
    savePublication
)

router.get(
    '/',
    [
        validarCampos
    ],
    getPublications
)

router.delete(
    '/:id',
    [
        validarCampos
    ],
    eliminarPubli
)

router.put(
    '/:id',
    [
        validarCampos
    ],
    updatePubli
)

export default router;