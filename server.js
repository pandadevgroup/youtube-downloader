const express = require('express')
const path = require('path')
const ytdl = require('ytdl-core');
const ytSearch = require("youtube-search");
const PORT = process.env.PORT || 5000

var searchOpts = {
	maxResults: 30,
	key: 'AIzaSyCz3AK9ZY3v-d0ga11E6X1u3vMhIewVFxQ'
};

express()
	.use(express.static(path.join(__dirname, 'web')))
	.get('/', (req, res) => res.sendFile(path.join(__dirname, "web", "index.html")))
	.get("/api/getInfo/:id", (req, res) => {
		ytdl.getInfo(`https://www.youtube.com/watch?v=${req.params.id}`, (err, info) => {
			if (err) return res.status(500).send(err);
			res.send(info);
		});
	})
	.get("/api/search/:query", (req, res) => {
		ytSearch(req.params.query, searchOpts, (err, results) => {
			if (err) return res.status(500).send(err);
			res.send(results);
		});
	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
