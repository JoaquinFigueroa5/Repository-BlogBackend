import rateLimit from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: {
        success: false,
        msg: "Demasiadas peticiones desde esta IP, por favor intente de nuevo despues de 15 minutos"
    }
})

export default limiter;