$(document).ready(function(){
	$(".quiz-item").addClass("active");
	$(".home-item").removeClass("active");

	$("#search_button").addClass("disabled");
	$("#search_box").attr('disabled', 'disabled');
	$("#search_button").attr('disabled', 'disabled');

	$(".final_score").html("Final Score: " + `<br>` + correct_answers + " / " + total_questions)

	for (var i = 0; i < missed_calls.length; i++) {
		let button = $(document.createElement("a"))
		button.html(missed_calls[i][1])
		button.addClass("btn btn-primary special_button")
		button.attr("href", "/view/" + missed_calls[i][0])
		$("#missed_calls").append(button)
	}

	if (correct_answers == total_questions) {
		$(".calls_missed").html(`<span class="perfect">Awesome job!</span> Perfect score!`)
	} else if (correct_answers / total_questions >= 0.5) {
		$(".calls_missed").html(`<span class="good">Not bad!</span> Here are the calls you missed:`)
	} else {
		$(".calls_missed").html(`<span class="bad">You'll get 'em next time.</span> Here are the calls you missed:`)
	}
})