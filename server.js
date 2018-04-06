const express = require('express')
const path = require('path')
const ytdl = require('ytdl-core');
const PORT = process.env.PORT || 5000

express()
	.use(express.static(path.join(__dirname, 'web')))
	.get('/', (req, res) => res.sendFile(path.join(__dirname, "web", "index.html")))
	.get("/api/getInfo/:id", (req, res) => {
		ytdl.getInfo(`https://www.youtube.com/watch?v=${req.params.id}`, (err, info) => {
			if (err) return res.status(500).send(err);
			res.send(info);
		});
	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
