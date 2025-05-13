import { Router } from "express";
import { getCourses } from "./course.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get(
    '/',
    [
        validarCampos
    ],
    getCourses
)

export default router;