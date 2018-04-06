(function() {
	let videoInfo;

	$(document).ready(function() {
		// TODO:
		// Add a form with Youtube URL. On submit, 
		// call onUrlEnter() with the video id (eg. "cyW2ajAVyfA")

		// Just for testing
		onUrlEnter("c0mX-5q3mrY");
	});

	function onUrlEnter(videoID) {
		$.get("/api/getInfo/" + videoID, function(data) {
			videoInfo = parseInfo(data);
			displayInfo(videoInfo);
		});
	}

	function parseInfo(data) {
		return {
			thumbnailUrl: "https://i.ytimg.com/vi/" + data.video_id + "/maxresdefault.jpg",
			title: data.title,
			video_id: data.video_id,
			length_seconds: data.length_seconds,
			author: data.author,
			formats: parseFormats(data.formats),
			published: data.published,
			description: data.description,
			video_url: data.video_url
		};
	}

	function parseFormats(formats) {
		return {
			
		};
	}

	function displayInfo(videoInfo) {
		// TODO: videoInfo is what parseInfo() returns
		console.log(videoInfo);
	}
})();
