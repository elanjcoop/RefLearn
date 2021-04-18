$(document).ready(function(){

	//console.log(Object.keys(player).length)
	if (Object.keys(call).length == 0) {
		let null_call = $("#null_call")
		null_call.html("Sorry, there is no call under this ID.")
	} else {
		show_call()
	}

	function show_call() {
		let call_name = $("#call_name")
		let call_description = $("#call_description")
		let call_image = $("#call_image")
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
		$("#call_view").empty()
	});

	search_box.on("keypress", (f) => {
		if (f.which == 13) {
				$("#call_view").empty()
			}
	});

});