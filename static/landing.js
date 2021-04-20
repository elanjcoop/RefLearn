$(document).ready(function(){
	$(".home-item").addClass("active");

	
	let main_title = $("#main_title")
	main_title.toggleClass("main")
	main_title.html("RefLearn")
	let main_description = $("#description_a")
	main_description.toggleClass("main_desc")
	main_description.html("RefLearn is a site for learning about how to signal the correct call on the basketball court.")
	let desc_b = $("#description_b")
	desc_b.toggleClass("main_b")
	desc_b.html("RefLearn focuses on non-NBA level, recreational basketball, and keep in mind that rules change based on the different levels of basketball being played.")
	let desc_c = $("#description_c")
	desc_c.toggleClass("main_c")
	desc_c.html("Thank you for visiting; you’ll be sure to learn a ton!")
	let desc_d = $("#description_d")
	desc_d.toggleClass("main_d")
	desc_d.html("Scroll down to find all the calls in basketball.")

	for (var i = 0; i < calls.length; i++) {
		let card = $(document.createElement("div"))
		card.addClass("call_card")
		let card_img = $(document.createElement("img"))
		card_img.attr("src", calls[i]["gif"])
		let card_title = $(document.createElement("a"))
		card_title.addClass("call_card-title")
		card_title.html(calls[i]["call"])
		card_title.attr("href", "/view/" + calls[i]["id"])
		card.append(card_img)
		card.append(card_title)
		$(".card_wrapper").append(card)
	}



	/*
	The scroll animation effects were converted and inspired by Mert Cukuren,
	link:
	https://codepen.io/knyttneve/pen/EGyQqN
	*/
	const cards = document.querySelectorAll(".call_card");
	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect()
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
	}

	function isCardVisible() {
		for (card of cards) {
			isElementInViewport(card)
			? card.classList.add("isVisible")
			: card.classList.remove("isVisible");
		}
	}

	document.addEventListener("DOMContentLoaded", isCardVisible);
	window.addEventListener("scroll", isCardVisible);
	window.addEventListener("resize", isCardVisible);
	document.getElementById("card_wrapper").addEventListener("scroll", isCardVisible);


});