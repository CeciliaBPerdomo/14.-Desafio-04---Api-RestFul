import express from 'express'

const app = express()

const routerProductos = express.Router()
app.use('/productos', routerProductos)
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const productos = []
/* ---- Guardar ----- */
routerProductos.post('/guardar', (req, res) => {
    if (req.body !== "") {
        let idProd = productos.length + 1
        const newProd = req.body + {id: idProd}
        productos.push(newProd)
        res.json(newProd)
        //res.send('Producto guardado con exito')
    } else {
        res.json('Los campos están vacios')
    }
})

/* ----- Listar ------------ */
routerProductos.get('/listar', (req, res) => {
    res.json(productos)
})

/* ---- Server Listen ----- */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error en el servidor ${error}`))