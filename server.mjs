import express from 'express'
import cors from 'cors'
const app = express();
const port = process.env.PORT || 4444;

//  (Request) req method comes from the client side
//  (Response) res method is send from server side to client side as a result of response
//  .post is used to create something from client side and then send to server
//  .get is used to get something from the server
//  

let todos = []

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    // console.log('Request IP :', req.ip)
    console.log('Hello World From Server')
    res.send(`Hello World From Server`)
})

app.post('/todo', (req, res) => {
    console.log('Request send from client side')
    todos.push(req.body.text)
    res.send({
        messsage: "your task has been saved",
        data: todos
    })
})

app.get('/todos', (req, res) => {
    console.log('Request send from client side')
    res.send({
        messaage: "Here is ur task",
        data: todos
    })
})

//

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})