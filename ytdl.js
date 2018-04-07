const path = require('path')
const ytdl = require('ytdl-core');
const fs = require("fs");

module.exports = {
	download(videoId, quality) {
		const url = `https://www.youtube.com/watch?v=${videoId}`;
		const output = path.resolve(__dirname, "downloads", `${videoId}_${Date.now()}.mp4`);
		return new Promise((resolve, reject) => {
			ytdl(url, { quality })
				.on("error", (e) => reject(e))
				.pipe(fs.createWriteStream(output))
				.on('finish', () => {
					resolve(output);
				});
		});
	}
};
