const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/:id', async function(req, res) {
    const id = req.params.id
    const response = await axios.get(`https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com/Rooms/${id}.json`)
    const plainText = (response.data && response.data.content) || ''
    return res.send(plainText)
})

module.exports = router