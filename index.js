const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())

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

app.listen(3001, () => console.log('Server running on port 3001'))