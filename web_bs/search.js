(function($) {
	$(document).ready(function() {
		$("#searchForm").submit(function(e) {
			e.preventDefault();
			var search = $("#search").val();
			runSearch(
				search,
				function(searchResults) {
					console.log(searchResults);
					$("#searchResult").text(JSON.stringify(searchResults, null, 4));
				},
				function(error) {
					console.error("Error while searching:", error);
				}
			);
		});
	});

	function runSearch(search, success, error) {
		$.get("/api/search/" + search, success).fail(error);
	}
})(jQuery);
