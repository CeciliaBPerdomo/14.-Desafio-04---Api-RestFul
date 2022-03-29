// Consigna: Realizar un proyecto de servidor basado en node.js y express que 
// ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes 
//rutas:

import express from 'express'

const app = express()

const routerProductos = express.Router()
app.use('/productos', routerProductos)
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const productos = [
    {
        nombre: 'Escuadra',
        precio: 25,
        thumbnail: 'www.fotoescuadra.com'
    },
    {
        nombre: 'Regla',
        precio: 20,
        thumbnail: 'www.fotoregla.com'
    } 

]

// recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post('/guardar', (req, res) => {
    if (req.body !== "") {
        let idProd = productos.length + 1
        productos.push(req.body)
        res.json(req.body)
    } else {
        res.json('Los campos están vacios')
    }
})

// Devuelve todos los productos.
routerProductos.get('/listar', (req, res) => {
    res.json(productos)
})

// Devuelve un producto según su id.
routerProductos.get('/listar/:id', (req, res) => {
    const { id } = req.params
    res.send({ producto: productos[parseInt(id) - 1]})
})

// recibe y actualiza un producto según su id.
routerProductos.put('/modificar/:id', (req, res) => {
    const { prod } = req.body
    const { id } = req.params
    const anterior = productos[parseInt(id) - 1]
    productos[parseInt(id) - 1] = prod
    res.json({Actualizada: productos[parseInt(id) - 1], Anterior: anterior})
})

// elimina un producto según su id.
app.delete('/borrar/:id', (req, res) => {
    const { id } = req.params
    const prod = productos[parseInt(id) - 1]
    res.send({ borrado: prod })
})

/* ---- Server Listen ----- */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))