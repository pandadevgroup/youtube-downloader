const fs = require('fs');
const ytdl = require('ytdl-core');

ytdl.getInfo("https://www.youtube.com/watch?v=HGdwNVZfWeg", (err, info) => {
	if (err) throw err;
	var audio = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
	var highest = ytdl.chooseFormat(info.formats, { quality: "highest" });
	var lowest = ytdl.chooseFormat(info.formats, { quality: "lowest" });
	console.log(audio, highest, lowest);
});
