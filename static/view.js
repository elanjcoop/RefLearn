$(document).ready(function(){

	//console.log(Object.keys(player).length)
	if (Object.keys(call).length == 0) {
		let null_player = $("#null_player")
		null_player.html("Sorry, there is no player under this id.")
	} else {
		show_player()
	}

	function show_player() {
		let call_name = $("#player_name")
		let call_description = $("#player_description")
		let call_image = $("#player_image")
		call_image.attr("src", call["gif"])
		//player_image.attr("alt", player["alt"])
		call_name.append(`<span class="bold">Name: </span><br>`)
		call_name.append(call["call"])

		call_description.append(`<span class="bold">Description: </span><br>`)
		call_description.append(call["description"])
	}

	let search_button = $("#search_button")
	let search_box = $("#search_box")
	search_button.on("click", (f) => {
		$("#player_view").empty()
	});

	search_box.on("keypress", (f) => {
		if (f.which == 13) {
				$("#player_view").empty()
			}
	});

});