const express = require('express')
const path = require('path')
const ytdl = require('ytdl-core');
const ytSearch = require("youtube-search");
const ytdlHelper = require("./ytdl");
const request = require("request");
const PORT = process.env.PORT || 5000

const searchOpts = {
	maxResults: 30,
	key: 'AIzaSyCz3AK9ZY3v-d0ga11E6X1u3vMhIewVFxQ'
};
const maxDuration = 60 * 30; // 30 minutes

express()
	.use(express.static(path.join(__dirname, 'web', "build")))
	.get('/', (req, res) => res.sendFile(path.join(__dirname, "web", "build", "index.html")))
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
	.get("/api/download/:id", (req, res) => {
		ytdl.getInfo(`https://www.youtube.com/watch?v=${req.params.id}`, (err, info) => {
			if (err) return res.status(500).send(err);
			if (info.length_seconds > maxDuration) return res.status(400).send("Max duration is " + maxDuration + " seconds.");

			ytdlHelper.download(req.params.id, "highest").then(download => {
				res.sendFile(download)
			}).catch(e => res.status(500).send(e.message));
		});
	})
	.get("/api/download/:id/:itag", (req, res) => {
		ytdl.getInfo(`https://www.youtube.com/watch?v=${req.params.id}`, (err, info) => {
			if (err) return res.status(500).send(err);
			if (info.length_seconds > maxDuration) return res.status(400).send("Max duration is " + maxDuration + " seconds.");

			ytdlHelper.download(req.params.id, req.params.itag).then(download => {
				res.sendFile(download)
			}).catch(e => res.status(500).send(e.message));
		});
  })
  .get("/api/downloadThumbnail/:id", (req, res) => {
    request(`https://i.ytimg.com/vi/${req.params.id}/maxresdefault.jpg`).pipe(res);
  })
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
