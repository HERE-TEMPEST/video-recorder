const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(parseInt(process.env.PORT, 10), () => {
	console.log(`[SERVER STARTING] Server listens to ${process.env.PORT} port`)
})
