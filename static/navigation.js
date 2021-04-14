let results = 0
$(document).ready(function(){
	let search_box = $("#search_box")
	let search_button = $("#search_button")

	search_button.on("click", (f) => {
		display_matches()
	});

	search_box.on("keypress", (f) => {
		if (f.which == 13) {
				display_matches()
			}
	});


	function delete_cards() {
		$(".row").html("")

	}

	function display_custom(matches, results) {
		let results_shown = $("#results")
		results_shown.html("Results: " + results)


		for (var i = results - 1; i >= 0; i--) {

			let section = $(document.createElement("section"))
			let card = $(document.createElement("div"))
			let card_body = $(document.createElement("div"))
			section.addClass("col-xl-3")
			section.addClass("index_section")
			card.addClass("card")
			card.addClass("h-100")
			card_body.addClass("card-body")
			let call_name = $(document.createElement("div"))
			let call_name_link = $(document.createElement("a"))
			let img = $(document.createElement("img"))
			call_name.html(matches[i]["call"])
			call_name.addClass("name")
			img.attr("src", matches[i]["gif"])
			//img.attr("alt", players[i]["alt"])
			img.addClass("player_card_image")
			call_name_link.attr("href", "/view/" + matches[i]["id"])
			card.append(img)
			call_name_link.append(call_name)
			card_body.append(call_name_link)
			card.append(card_body)
			section.append(card)
			$("#nav_row").append(section)
			//$(".row").append(section)
		}

	}

	function display_matches() {

		let keyword = search_box.val()
		let matches = []

		$.ajax({
		    type: 'POST',
		    url: '/search',
		    data: JSON.stringify(keyword),
		    dataType: 'json',
		    contentType: 'application/json; charset=utf-8',
		    success: function(result){
				results = result["matches"].length
				let matches = result["matches"]
				console.log(matches)
		    	console.log("Results: " + result["matches"].length)
				delete_cards();
				display_custom(matches, results)
				search_box.val("")
		    },
		    error: function(request, status, error){
		    	console.log('Error');
		      	console.log(request);
		    	console.log(status);
		    	console.log(error);
		    }
	  	})
	}

})