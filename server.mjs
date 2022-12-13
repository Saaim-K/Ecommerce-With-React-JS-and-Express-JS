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

// -------------------------- Rest API Principles --------------------------
//      1) Uniform Interface
//      2) Sepration of concern of client and server. req and res will be in json
//      3) Stateless means data should be stored in database
//      4) Uniform Interface
//      5) Uniform Interface

app.use(cors())
app.use(express.json()); // Parsing body at server

let products = [];// Connect with Mongo DB



// ----------------------------------- Create/Add Product -----------------------------------
app.post('/product', (req, res) => {
    const body = req.body

    // ------------- 1st Method -------------
    if (!body.name || !body.price || !body.description) {
        res.status(400).send({
            message: 'Required Paramters Missing'
        })
        return;
    }
    products.push({
        id: `${new Date().getTime()}`,
        name: body.name,
        price: body.price,
        description: body.description
    })
    console.log(body.name)
    console.log(body.price)
    console.log(body.description)
    res.send({
        message: 'Product added succesfullly'
    })
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
// ------------------------ Get Single Product ------------------------
app.get('/product/:id', (req, res) => {
    const id = req.params.id
    let isFound = false
    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            res.send({
                message: `Got the product of the specified id ${products[i].id}`,
                data: products[i]
            })
            isFound = true
            break
        }
    }
    if (!isFound) {
        res.status(400)
        res.send({
            message: 'Product Not Fund'
        })
    }
})
// ------------------------ Get Single Product ------------------------

// ------------------------ Get All Product ------------------------
app.get('/products', (req, res) => {
    res.send({
        message: "All products",
        data: products
    })
})
// ------------------------ Get All Product ------------------------
// ----------------------------------- Get Product -----------------------------------



// ----------------------------------- Delete Product -----------------------------------
app.delete('/product/:id', (req, res) => {
    const id = req.params.id
    let isFound = false
    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1)
            res.send({
                message: `</h1> Product of id ${products[i]} deleted Succesfully </h1>`
            })
            isFound = true
            break
        }
    } if (!isFound) {
        res.status(404)
        res.send({
            message: 'Delete Fail : Product Not Fund'
        })
    }
})
// ----------------------------------- Delete Product -----------------------------------



// ----------------------------------- Update Product -----------------------------------
app.put('/product/:id', (req, res) => {
    const body = req.body
    const id = req.params.id

    if (!body.name || !body.price || !body.description) {
        res.status(400).send({
            message: "Required Paramters Missing"
        })
        return;
    }

    let isFound = false
    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products[i].name = body.name
            products[i].price = body.price
            products[i].description = body.description
            res.send({
                message: `</h1> Product Modified Succesfully </h1>}`
            })
            isFound = true
            break
        }
    } if (!isFound) {
        res.status(404)
        res.send({
            message: 'Update Fail : Product Not Fund'
        })
    }
})
// ----------------------------------- Update Product -----------------------------------



const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './app/build')))
app.use('*', express.static(path.join(__dirname, './app/build')))


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})