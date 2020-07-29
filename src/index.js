const express = require('express')
const { uuid } = require('uuidv4')
const app = express()
const porta = 3333
const scraps = []

const sequence = {
    _id: 1,
    get id() { return this._id++ }
}

console.log(sequence.id);

app.use(express.json())


app.get('/scraps', (req, res) => {

    return res.json(scraps)
})

app.post('/scraps', (req, res) => {

    const { title, message } = req.body


    const scrap = { id: uuid(), title, message }


    scraps.push(scrap)

    return res.json(scrap)
})

app.put('/scraps/:id', (req, res) => {
    let { id } = req.params
    const { title, message } = req.body

    const scrapIndex = scraps.findIndex((scrap) => scrap.id === id)

    if (scrapIndex < 0) {
        console.log(scrapIndex);
        return res.status(400).json({ error: "Scrap does not exist. Try another ID." })
    }

    const scrap = { id, title, message }

    scraps[scrapIndex] = scrap

    return res.json(scrap)


})

app.delete('/scraps/:id', (req, res) => {
    let { id } = req.params
    const { title, message } = req.body

    const scrapIndex = scraps.findIndex((scrap) => scrap.id === id)

    if (scrapIndex < 0) {
        console.log(scrapIndex);
        return res.status(400).json({ error: "Can't delete a non existent scrap. Please choose another ID." })
    }

    const scrap = { id, title, message }

    scraps.splice(scrapIndex, 1)

    return res.json(scrap)


})



app.listen(porta, () => {
    console.log(`🚀 Methods gallore! 🚀`)
});