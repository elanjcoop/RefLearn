$(document).ready(function(){
	$(".quiz-item").addClass("active");
	$(".home-item").removeClass("active");
	
	let main_title = $("#main_title")
	main_title.toggleClass("main")
	main_title.html("Ready to quiz yourself?")
	let main_description = $("#main_description")
	main_description.toggleClass("main_desc")
	main_description.html("There are many ways to test your brain. Select your favorite.")
	
	let gif_quiz_button = $(document.createElement("a"))
	gif_quiz_button.addClass("btn btn-primary special_button")
	gif_quiz_button.html("GIF Quiz")
	gif_quiz_button.attr("href", "/quiz/gif")

	let call_quiz_button = $(document.createElement("a"))
	call_quiz_button.addClass("btn btn-primary special_button")
	call_quiz_button.html("Call Quiz")
	call_quiz_button.attr("href", "/quiz/call")

	let rules_quiz_button = $(document.createElement("a"))
	rules_quiz_button.addClass("btn btn-primary special_button")
	rules_quiz_button.html("Rules Quiz")
	rules_quiz_button.attr("href", "/quiz/rules")
	
	$("#btn_row").append(gif_quiz_button);
	$("#btn_row").append(call_quiz_button);
	$("#btn_row").append(rules_quiz_button);


	
});