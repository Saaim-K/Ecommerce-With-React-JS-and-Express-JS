import express from 'express'
const app = express();
port = process.env.PORT || 5001;

app.get('/', (req, res) => {
    console.log('Request IP :', req.ip)
    res.send(`<h1>Hello World From React App</h1>`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})