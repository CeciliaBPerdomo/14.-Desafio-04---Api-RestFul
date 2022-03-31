// Consigna: Realizar un proyecto de servidor basado en node.js y express que 
// ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes 
//rutas:

import express from 'express'
import routes from './routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/productos', routes)

/* ---- Server Listen ----- */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))