(function($) {
	$(document).ready(function() {
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

		$("#getInfoForm").submit(function(e) {
			e.preventDefault();
			var url = $("#url").val();

			showLoading();

			getVideoInfo(
				url,
				function(videoInfo) {
					hideLoading();
					displayInfo(videoInfo);
				},
				function(error) {
					hideLoading();
					displayError("Failed to fetch video info. Is the provided video URL correct?", "Error:", 1);
				}
			);
		});
	});

	function getVideoInfo(videoID, success, error) {
		$.get("/api/getInfo/" + videoID, function(data) {
			var videoInfo = parseInfo(data);
			success(videoInfo);
		}).fail(error);
	}

	function parseInfo(data) {
		var selectedEncoding = "H.264";
		return {
			thumbnailUrl: "https://i.ytimg.com/vi/" + data.video_id + "/maxresdefault.jpg",
			title: data.title,
			video_id: data.video_id,
			length_seconds: data.length_seconds,
			author: data.author,
			formats: parseFormats(data.fmt_list, data.formats, selectedEncoding),
			published: data.published,
			description: data.description,
			video_url: data.video_url
		};
	}

	function parseFormats(fmt_list, formats, selectedEncoding) {
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
			var format = getFormatFromTag(tag, formats);
			if (!format || format.encoding !== selectedEncoding) continue;

			var name = resolutionToNameMap[resolution] || "Unknown (" + resolution + ")";

			parsed[name] = format;
		}

		// TEMPORARY AUDIO SOLUTION
		parsed["Audio Only (m4a)"] = getFormatFromTag("140", formats);

		return parsed;
	}

	function getFormatFromTag(tag, formats) {
		for (var i = 0; i < formats.length; i++) {
			if (formats[i].itag === tag) return formats[i];
		}
		return null;
	}

	function showLoading() {
		$("#download").text("Loading...");
		$("#download").attr("disabled", "disabled");
	}

	function hideLoading() {
		$("#download").text("Download");
		$("#download").removeAttr("disabled", "disabled");
	}

	function displayError(text, title, id) {
		$(".alert-1").remove();
		$("#alert-box").append(getAlert("danger", text, title, id));
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
		for (var formatName in videoInfo.formats) {
			$(".container").append(
				"<p><a href='/api/download/" + videoInfo.video_id + "/" +
					videoInfo.formats[formatName].itag +
					"' download='" +
					videoInfo.title +
					"' target='_blank'>" +
					formatName +
					"</a></p>"
			);
			fetch(videoInfo.formats[formatName].url)
				.then(res => res.blob()) // Gets the response and returns it as a blob
				.then(blob => {
					// Here's where you get access to the blob
					// And you can use it for whatever you want
					// Like calling ref().put(blob)

					// Here, I use it to make an image appear on the page
					let objectURL = URL.createObjectURL(blob);
					console.log(objectURL);
				});
		}
		$(".src-thumbnailUrl").attr("src", videoInfo.thumbnailUrl);
		$(".href-thumbnailUrl").attr("href", videoInfo.thumbnailUrl);
		$(".href-video_url").attr("href", videoInfo.video_url);
	}
	function getAlert(type, message, title, id) {
		return `<div class="alert alert-${type} alert-dismissible fade show alert-${id}" role="alert">
		<strong>${title == null ? "" : title}</strong> ${message}
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
		<span aria-hidden="true">&times;</span>
	  </button>
	  </div>`;
	}
})(jQuery);
