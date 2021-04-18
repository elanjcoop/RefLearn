$(document).ready(function(){

	$(".quiz-item").addClass("active");
	$(".home-item").removeClass("active");

	$("#search_button").addClass("disabled");
	$("#search_box").attr('disabled', 'disabled');
	$("#search_button").attr('disabled', 'disabled');

	delete_cards()

	$("#question_number").html(`<h1>` + "Question " + current_question + " / " + total_questions + `</h1>`)

	let gif = $(document.createElement("img"))
	gif.attr("src", correct_call)
	gif.addClass("question_image")
	$("#question_gif").append(gif)

	for (var i = 0; i < options.length; i++) {
		let button = $(document.createElement("button"))
		button.html(options[i]["call"])
		button.addClass("btn btn-primary special_button")
		button.attr("id", i)
		button.on("click", (e) => {
			submit(button.attr("id"))
		})
		$("#options_row").append(button)
	}
	


	function delete_cards() {
		$("#nav_row").html("")
	}

	function submit(i) {
		console.log(i)

		$.ajax({
			type: 'POST',
			url: '/submit_gif',
			data: JSON.stringify(i),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				if (result["done"]) {
					window.location.href = '/final_score_gif'
				} else {
				window.location.href = '/quiz/gif'
				}
			},
			error: function(request, status, error) {
		    	console.log('Error');
		      	console.log(request);
		    	console.log(status);
		    	console.log(error);
			}
		})
	}

});