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

		$.ajax({
			type: 'POST',
			url: '/submit',
			data: JSON.stringify(i),
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				show_feedback(result["correct_option"], i, result["done"])
			},
			error: function(request, status, error) {
		    	console.log('Error');
		      	console.log(request);
		    	console.log(status);
		    	console.log(error);
			}
		})
	}

	function show_feedback(correct_choice, chosen_choice, done) {
		$("button").attr('disabled', 'disabled');
		var correct_string = correct_choice.toString();
		if (correct_string == chosen_choice) {
			$(`button[id=${correct_choice}]`).addClass("btn-success")
		} else {
			$(`button[id=${correct_choice}]`).addClass("btn-success")
			$(`button[id=${chosen_choice}]`).addClass("btn-danger")
		}
		window.setTimeout(function(){ if (done) {
			window.location.href = '/final_score'
		} else {
			window.location.href = '/quiz/gif'
		}}, 2000)
	}

});