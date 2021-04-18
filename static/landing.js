$(document).ready(function(){
	$(".home-item").addClass("active");

	
	let main_title = $("#main_title")
	main_title.toggleClass("main")
	main_title.html("Welcome to RefLearn!")
	let main_description = $("#main_description")
	main_description.toggleClass("main_desc")
	main_description.html("RefLearn is a site for learning about how to signal the correct call on the basketball court. RefLearn focuses on non-NBA level, recreational basketball, and keep in mind that rules change based on the different levels of basketball being played. Thank you for visiting; you’ll be sure to learn a ton!")


	for (var i = 0; i < calls.length; i++) {
		let card = $(document.createElement("div"))
		card.addClass("call_card")
		let card_img = $(document.createElement("img"))
		card_img.attr("src", calls[i]["gif"])
		let card_title = $(document.createElement("h2"))
		card_title.addClass("call_card-title")
		card_title.html(calls[i]["call"])
		card.append(card_img)
		card.append(card_title)
		$(".card_wrapper").append(card)
	}

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

	var visibleY = function(el){
  		
};


});