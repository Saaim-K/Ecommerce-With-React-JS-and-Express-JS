import express from 'express'
import path from 'path'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 4444;

//  (Request) req method comes from the client side
//  (Response) res method is send from server side to client side as a result of response
//   POST  : .post is used to create something from client side and then send it to server
//   GET   : .get is used to grab something from the server
//   PUT   : .put request creates a resource or updates an existing resource.
//   DELETE: .delete request deletes a resource.

app.use(cors())
app.use(express.json()); // Parsing body at server

let products = [];// Connect with Mongo DB



// ----------------------------------- Create/Add Product -----------------------------------
app.post('/addProduct', (req, res) => {
    const body = req.body

    // ------------- 1st Method -------------
    if (!body.name && !body.price && !body.description) {
        res.status(400).send("Required Paramters Missing")
        return;
    }
    products.push({
        id: new Date().getTime(),
        name: body.name,
        price: body.price,
        description: body.description
    })
    console.log(body.name)
    console.log(body.price)
    console.log(body.description)
    res.send('Product added succesfullly')
    // ------------- 1st Method -------------

    // ------------- 2nd Method -------------
    // if (body.name && body.price && body.description) {
    //     products.push({
    //         name: body.name,
    //         price: body.price,
    //         description: body.description
    //     })
    //     console.log(body.name)
    //     console.log(body.price)
    //     console.log(body.description)
    //     res.send('Product added succesfullly')
    // } else {
    //     res.status(400).send("Required Paramters Missing")
    // }
    // ------------- 2nd Method -------------

})
// ----------------------------------- Create/Add Product -----------------------------------



// ----------------------------------- Get Product -----------------------------------
// ------------------------ Get All Product ------------------------
app.get('/getProducts', (req, res) => {
    res.send(products)
})
// ------------------------ Get All Product ------------------------

// ------------------------ Get Single Product ------------------------
app.get('/getProduct/:id', (req, res) => {
    const id = req.params.id
    let isFound = false
    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            res.send(products[i])
            isFound = true
            break
        }
    } if (!isFound) {
        res.status(400)
        res.send('Product Not Fund')
    }
})
// ------------------------ Get Single Product ------------------------
// ----------------------------------- Get Product -----------------------------------



// ----------------------------------- Delete Product -----------------------------------
app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id
    let isFound = false
    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1)
            res.send(`</h1> Product deleted Succesfully </h1> ${products[i]}`)
            isFound = true
            break
        }
    } if (!isFound) {
        res.status(404)
        res.send('Delete Fail : Product Not Fund')
    }
})
// ----------------------------------- Delete Product -----------------------------------



// ----------------------------------- Update Product -----------------------------------
app.put('/updateProduct/:id', (req, res) => {
    const body = req.body
    const id = req.params.id

    if (!body.name && !body.price && !body.description) {
        res.status(400).send("Required Paramters Missing")
        return;
    }

    let isFound = false
    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products[i].name = body.name
            products[i].price = body.price
            products[i].description = body.description
            res.send(`</h1> Product Modified Succesfully </h1>}`)
            isFound = true
            break
        }
    } if (!isFound) {
        res.status(404)
        res.send('Update Fail : Product Not Fund')
    }







})
// ----------------------------------- Update Product -----------------------------------



const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './app/build')))
app.use('*', express.static(path.join(__dirname, './app/build')))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})