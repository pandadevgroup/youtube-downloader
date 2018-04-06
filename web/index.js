(function($) {
	$(document).ready(function() {
		let videoInfo;

		// TODO:
		// Add a form with Youtube URL. Add the submit() handler.

		// Just for testing
		onUrlEnter("c0mX-5q3mrY");

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
		return {};
	}

	function displayInfo(videoInfo) {
		// TODO
	}
})(jQuery);
