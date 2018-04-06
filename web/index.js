(function($) {
	$(document).ready(function() {
		// TODO:
		// Add a form with Youtube URL. Add the submit() handler.
		var videoURLRegex = new RegExp("^(?:https?)?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/watch?v=|youtu\\.be\\/)(.+)$");
		console.log(0);
		$("#url").keyup(function() {
			console.log(1);
			var url = $("#url").val();
			var testResults = videoURLRegex.exec(url);
			console.log(testResults);
			if (testResults != null) {
				console.log(2);
				$("#url").val(testResults[1]);
			} else {
				console.log(testResults);
			}
		});
	});


})(jQuery);
