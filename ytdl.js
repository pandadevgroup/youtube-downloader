const path = require('path')
const ytdl = require('ytdl-core');
const fs = require("fs");

module.exports = {
	download(videoId) {
		const url = `https://www.youtube.com/watch?v=${videoId}`;
		const output = path.resolve(__dirname, "downloads", `${videoId}.mp4`);
		return new Promise((resolve, reject) => {
			ytdl(url, { quality: "highest" })
				// Write audio to file since ffmpeg supports only one input stream.
				.pipe(fs.createWriteStream(output))
				.on('finish', () => {
					resolve(output);
					console.log("Done downloading");
				});
		});
	}
};
