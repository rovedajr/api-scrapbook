const express = require('express')
// const { response } = require('express')
const app = express()
const porta = 3333
const scraps = []

const sequence = {
    _id: 1,
    get id() { return this._id++ }
}

app.use(express.json())


app.get('/scraps', (req, res) => {

    return res.json(scraps)
})

app.post('/scraps', (req, res) => {
    let id = sequence.id
    const { title, message } = req.body
    const scrap = { id, title, message }


    scraps.push(scrap)

    return res.json(scrap)
})

app.put('scrap/:id', (req, res) => {
    const id = req.params
    const { title, message } = req.body


})

// app.delete()

app.listen(porta, () => {
    console.log(`🚀 Methods gallore! 🚀`)
});