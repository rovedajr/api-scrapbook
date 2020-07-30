const express = require('express')
const { uuid, isUuid } = require('uuidv4')
const app = express()
const porta = 3333
const scraps = []

// Right, middlewares...

function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `${method}`

    console.time(logLabel)

    next()

    console.timeEnd(logLabel)

}

function validateProjectId(req, res, next) {
    const { id } = req.params

    if (!isUuid(id)) {
        return res.status(400)
            .json({ error: `Not a valid uuid!` })
    }
    next()
}


function emptyMessageOrTitle(req, res, next) {

    const { title, message } = req.body

    if (!title || !message) {
        return res.json({ error: `Message can't be empty` })
    }

    next();

}


app.use(express.json())

app.use(logRequests)
// app.use('/projects/:id', validateProjectId)


app.get('/scraps', (req, res) => {

    return res.json(scraps)
})

app.post('/scraps', emptyMessageOrTitle, (req, res) => {

    const { title, message } = req.body


    const scrap = { id: uuid(), title, message }


    scraps.push(scrap)

    return res.json(scrap)
})

app.put('/scraps/:id', validateProjectId, (req, res) => {
    let { id } = req.params
    const { title, message } = req.body

    const scrapIndex = scraps.findIndex((scrap) => scrap.id === id)

    // Scrapindex ou é -1 se der erro ou é o ID



    if (scrapIndex < 0) {
        console.log(scrapIndex);
        return res.status(400).json({ error: "Scrap does not exist. Try another ID." })
    }

    const scrap = { id, title, message }

    scraps[scrapIndex] = scrap


    return res.json(scrap)


})

app.delete('/scraps/:id', validateProjectId, (req, res) => {
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