$(document).ready(function(){
	$(".explore-item").addClass("active");
	$(".home-item").removeClass("active");

	
	display_all();

	let offensive_violations = $("#offensive_violations")
	offensive_violations.toggleClass("type_desc")
	offensive_violations.html("Offensive Violations")
	let fouls = $("#fouls")
	fouls.toggleClass("type_desc")
	fouls.html("Fouls")
	let misc = $("#misc")
	misc.toggleClass("type_desc")
	misc.html("Miscellaneous")
	

	function display_all() {

		for (var i = 0; i < calls.length; i++) {

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
			call_name.html(calls[i]["call"])
			call_name.addClass("name")
			img.attr("src", calls[i]["gif"])
			//img.attr("alt", players[i]["alt"])
			img.addClass("player_card_image")
			call_name_link.attr("href", "/view/" + calls[i]["id"])
			card.append(img)
			call_name_link.append(call_name)
			card_body.append(call_name_link)
			card.append(card_body)
			section.append(card)
			if (i == 0 || i == 1 || i == 2) {
				$("#off_row").append(section)
			} else if (i == 3 || i == 4 || i == 5) {
				$("#foul_row").append(section)
			} else if (i == 6 || i == 7 || i == 8 || i == 9) {
				$("#misc_row").append(section)
			}
		}
	}

});