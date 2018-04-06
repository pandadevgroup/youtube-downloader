(function($) {
	$(document).ready(function() {
		let videoInfo;

		// TODO:
		// Add a form with Youtube URL. On submit,
		// call onUrlEnter() with the video id (eg. "cyW2ajAVyfA")

		// Just for testing

		var videoURLRegex = new RegExp(
			"^(?:https?)?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)(.+)$"
		);
		$("#url").keyup(function() {
			var url = $("#url").val();
			var testResults = videoURLRegex.exec(url);
			if (testResults != null) {
				$("#url").val(testResults[1]);
			}
		});
		$("#download").click(function() {
			//TODO: make keyup
			var url = $("#url").val();
			onUrlEnter(url);
		});
	});
	function onUrlEnter(videoID) {
		$.get("/api/getInfo/" + videoID, function(data) {
			videoInfo = parseInfo(data);
			displayInfo(videoInfo);
		});
	}

	function parseInfo(data) {
		data.thumbnailUrl = "https://i.ytimg.com/vi/" + data.video_id + "/maxresdefault.jpg";
		data.formats = parseFormats(data.formats);
		return data;
		/*
		Officially supported params:
		{
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
		
		*/
	}

	function parseFormats(formats) {
		return {};
	}

	function displayInfo(videoInfo) {
		// TODO: videoInfo is what parseInfo() returns
		console.log(videoInfo);
		attrs = [
			"thumbnailUrl",
			"title",
			"video_id",
			"length_seconds",
			"author",
			"formats",
			"published",
			"description",
			"video_url"
		];
		for (i = 0; i < attrs.length; i++) {
			$(".videodata-" + attrs[i]).text(videoInfo[attrs[i]]);
			
		}
		$(".src-thumbnailUrl").attr("src", videoInfo.thumbnailUrl);
		$(".href-thumbnailUrl").attr("href", videoInfo.thumbnailUrl);
		$(".href-video_url").attr("href", videoInfo.video_url);
	}
})(jQuery);
