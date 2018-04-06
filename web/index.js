(function() {
	let videoInfo;

	$(document).ready(function() {
		// TODO:
		// Add a form with Youtube URL. Add the submit() handler.

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

		};
	}

	function displayInfo(videoInfo) {
		// TODO
	}
})();
