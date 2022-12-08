import express from 'express'
const app = express();
const port = process.env.PORT || 5555;

//   .post is used to create something
//   .get is used to get something
app.get('/', (req, res) => {
    // console.log('Request IP :', req.ip)
    console.log('Hello World From Server')
    res.send(`Hello World From Server`)
})

app.post('/water', (req, res) => {
    console.log('Someone is sending Water')//server side displayed message
    res.send(`<h1>Water Recieved</h1>`)//message shown to user
})

app.get('/pizza', (req, res) => {
    console.log('Someone is requesting for Pizza')
    res.send(`<h1>Hey Bro! Here's your pizza</h1>`)
})

app.get('*', (req, res) => {
    console.log('404')
    res.send()
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})