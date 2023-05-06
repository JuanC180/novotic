
// const express = require("express")
import express  from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"
import clienteRoutes from "./routes/clienteRoutes.js"


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000

dotenv.config()
conectarDB()

console.log(process.env.MONGO_URI)

app.use("/api/clientes", clienteRoutes)

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo por el puerto: ${PORT}`)
})