import Cliente from "../models/Cliente.js"
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) =>{

    const {email} = req.body

    // prevenir usuarios duplicados
    const existeUsuario = await Cliente.findOne({email})

    if(existeUsuario){
        const error = new Error("Usuario ya registrado..")
        return res.status(400).json({msg: error.message})
    }

    try {
        // guradar nuevo cliente
        const cliente = new Cliente(req.body);
        const clienteGuardado = await cliente.save();
        res.json(clienteGuardado)
        // res.json({msg: "Registrano cliente...."})

    } catch (error) {
        console.log(error)
    }
}

const perfil = (req, res) => {
    
    const { cliente } = req;

    res.json({ cliente })
}

const confirmar = async (req, res) =>{
    const {token} = req.params
    const usuarioConfirmar = await Cliente.findOne({token})
    
    if(!usuarioConfirmar){
        const error = new Error("Token no válido")
        return res.status(404).json({msg:error.message})
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req, res) =>{
   const {email, password} = req.body

   const usuario = await Cliente.findOne({email})

   if(!usuario){
    const error = new Error("El Usuario no existe");
    return res.status(404).json({msg: error.message});
   }

   // comprobar si un usaurio esta comprobado
   if(!usuario.confirmado){
    const error = new Error("tu cuenta no ha sido confirmada");
    return res.status(403).json({msg: error.message});
   }

   // revisar el password
   if( await usuario.comprobarPassword(password)){
    // autenticar
    res.json({token: generarJWT(usuario.id)})
    // console.log("=== usuario ===")
    // console.log(usuario)
    // console.log(usuario.id)
   }else{
    const error = new Error("El password es incorrecto");
    return res.status(403).json({msg: error.message});
   }
}


const olvidePassword = async (req, res)=>{
    const { email } = req.body;

    const existeCliente = await Cliente.findOne({email})

    if(!existeCliente){
        const error = new Error("El Usuario no existe");
        return res.status(400).json({msg: error.message})
    }

    try {
        existeCliente.token = generarId();
        await existeCliente.save()
        res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }
}
const comprobarToken = async (req, res)=>{
    const { token } = req.params;

    const tokenValido = await Cliente.findOne({token})

    if(tokenValido){
        // el token es valido el usuario existe
        res.json({msg: "Token valido y el usuario existe"})
    }else{
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message})
    }

}
const nuevoPassword = async (req, res)=>{
    const { token }    = req.params;
    const { password } = req.body;

    const cliente = await Cliente.findOne({token})
    if(!cliente){
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message})
    }

    try {
        cliente.token = null;
        cliente.password = password;
        await cliente.save();
        res.json({msg: "Password modificado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

export {
    registrar,
    confirmar,
    autenticar,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}