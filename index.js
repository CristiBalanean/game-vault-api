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

app.get('/api/rawg/*path', async (req, res) => {
    try {
        const path = req.params.path
        const query = new URLSearchParams(req.query).toString()
        const url = `https://api.rawg.io/api/${path}?key=${RAWG_KEY}&${query}`
        console.log('RAWG_KEY exists:', !!RAWG_KEY)
        console.log('Fetching URL:', url)
        const response = await fetch(url)
        console.log('Response status:', response.status)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        console.log('Error:', err.message)
        res.status(500).json({ error: 'Failed to fetch RAWG data' })
    }
})

app.listen(3001, () => console.log('Server running on port 3001'))