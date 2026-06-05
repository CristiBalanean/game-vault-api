const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()

const RAWG_KEY = process.env.RAWG_KEY

app.use(cors({
    origin: ['https://game-vault-tau-seven.vercel.app', 'http://localhost:5173']
}))

app.get('/api/steam/:steamId', async (req, res) => {
    try {
        const { steamId } = req.params
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${steamId}`)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Steam data' })
    }
})

app.get('/api/rawg/*', async (req, res) => {
    try {
        const path = req.params[0]
        const query = new URLSearchParams(req.query).toString()
        const url = `https://api.rawg.io/api/${path}?key=${RAWG_KEY}&${query}`
        const response = await fetch(url)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch RAWG data' })
    }
})

app.listen(3001, () => console.log('Server running on port 3001'))