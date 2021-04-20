$(document).ready(function(){
	$(".quiz-item").addClass("active");
	$(".home-item").removeClass("active");
	
	let main_title = $("#main_title")
	main_title.toggleClass("main")
	main_title.html("Ready to quiz yourself?")
	let main_description = $("#description_a")
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

	let gif_explain = $("#gif_explain")
	gif_explain.toggleClass("explanations")
	gif_explain.html("Select <span class='quiz_name'>GIF Quiz</span> to be prompted with a GIF and then select the corresponding call.")
	let call_explain = $("#call_explain")
	call_explain.toggleClass("explanations")
	call_explain.html("Select <span class='quiz_name'>Call Quiz</span> to be prompted with a call and then select the corresponding GIF.")
	let rules_explain = $("#rules_explain")
	rules_explain.toggleClass("explanations")
	rules_explain.html("Select <span class='quiz_name'>Rules Quiz</span> to be prompted with a rule description and then select the corresponding rule.")


	
});