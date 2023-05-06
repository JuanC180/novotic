import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";


const clienteSchema = mongoose.Schema({
    cedula: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    camara_comercio: {
        type: String,
        trim: true
    },
    nit_rut: {
        type: String,
        required: true,
        trim: true
    },
    departamento: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        value: "user",
        required: true,
        trim: true
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado:{
        type: Boolean,
        default: false
    }
})

clienteSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

clienteSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Cliente = mongoose.model("Cliente", clienteSchema)
export default Cliente