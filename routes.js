import express from 'express'
//const app = express()
const routerProductos = express.Router()

const productos = [
    {
        nombre: 'Escuadra',
        precio: 25,
        thumbnail: 'www.fotoescuadra.com', 
        id: 1
    },
    {
        nombre: 'Regla',
        precio: 20,
        thumbnail: 'www.fotoregla.com', 
        id: 2
    } 
]

// recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post('/guardar', (req, res) => {
    prod.id = productos[productos.length - 1].id + 1
    productos.push(req.body)
    res.json(productos)
})

// Devuelve todos los productos.
routerProductos.get('/', (req, res) => {
    res.json(productos)
})

// Devuelve un producto según su id.
routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    let prodId = productos.filter(productos => productos.id === parseInt(id))
    res.send(prodId)
})

// recibe y actualiza un producto según su id.
routerProductos.put('/:id', (req, res) => {
    const { prodNuevo } = req.body
    const { id } = req.params

    const index = productos.filter(prod => prod.id === parseInt(id))

    if (prodNuevo.nombre) {
        productos[index].nombre = prodNuevo.nombre
    }

    if (prodNuevo.precio) {
        productos[index].precio = prodNuevo.precio
    }

    if (prodNuevo.thumbnail) {
        productos[index].thumbnail = prodNuevo.thumbnail
    }

    res.send(prodNuevo)
})

// elimina un producto según su id.
routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    let prodId = productos.filter(productos => productos.id !== parseInt(id))
    res.send(prodId)
})

export default routerProductos