import express from "express";
const router = express.Router();
import { 
    registrar, 
    confirmar,
    autenticar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword

} from "../controllers/clienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

// area publica
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword)
// router.get("/olvide-password:token", comprobarToken);
// router.post("/olvide-password/:token", nuevoPassword)

router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// area prvado
router.get("/perfil", checkAuth, perfil)

export default router;

