const express = require("express");
const cors = require("cors");
const { response } = require("express");
const { uuid } = require("uuidv4");
const app = express();

app.use(cors());
app.use(express.json());
const scraps = [];




app.get("/scraps", (request, response) => {
    const { title } = request.query;

    const results = title
        ? scraps.filter((scrap) => scrap.title.includes(title))
        : scraps;

    return response.json(results);
});

app.post("/scraps", (request, response) => {
    const { title, message } = request.body;

    const scrap = { id: uuid(), title, message };

    scraps.push(scrap);

    return response.json(scrap);
});

app.put("/scraps/:id", (request, response) => {
    const { id } = request.params;
    const { title, message } = request.body;

    const scrapIndex = scraps.findIndex((scrap) => scrap.id == id);

    if (scrapIndex < 0) {
        return response.status(400).json({ error: "scrap not found." });
    }

    const scrap = {
        id,
        title,
        message,
    };

    scraps[scrapIndex] = scrap;

    return response.json(scrap);
});

app.delete("/scraps/:id", (request, response) => {
    const { id } = request.params;

    const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

    if (scrapIndex < 0) {
        return response.status(400).json({ error: "scrap not found." });
    }

    scraps.splice(scrapIndex, 1);

    return response.status(204).send();
});

const port = 3333;

app.listen(3333, () => {
    console.log(`Server up and running on PORT ${port}`);
});