(function($) {
	var videoInfo;

	$(document).ready(function() {
		// TODO:
		// Add a form with Youtube URL. On submit, 
		// call onUrlEnter() with the video id (eg. "cyW2ajAVyfA")

		// Just for testing
		onUrlEnter("cyW2ajAVyfA");

		var videoURLRegex = new RegExp("^(?:https?)?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)(.+)$");
		$("#url").keyup(function() {
			var url = $("#url").val();
			var testResults = videoURLRegex.exec(url);
			if (testResults != null) {
				$("#url").val(testResults[1]);
			}
		});
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
			formats: parseFormats(data.fmt_list, data.formats),
			published: data.published,
			description: data.description,
			video_url: data.video_url
		};
	}

	function parseFormats(fmt_list, formats) {
		console.log(fmt_list, formats);
		var parsed = {};
		var resolutionToNameMap = {
			"176x144": "Very Low Quality (144p)",
			"320x180": "Low Quality (180p)",
			"640x360": "Medium Quality (360p)",
			"1280x720": "High Quality (720p)"
		};
		for (var i = 0; i < fmt_list.length; i++) {
			var tag = fmt_list[i][0];
			var resolution = fmt_list[i][1];
			var name = resolutionToNameMap[resolution] || "Unknown (" + resolution + ")";
			console.log(getFormatFromTag(tag, formats));
			parsed[name] = tag;
		}
		return parsed;
	}

	function getFormatFromTag(tag, formats) {
		for (var i = 0; i < formats.length; i++) {
			if (formats[i].itag === tag) return formats[i];
		}
		return null;
	}

	function displayInfo(videoInfo) {
		// TODO: videoInfo is what parseInfo() returns
		console.log(videoInfo);
	}
})(jQuery);
