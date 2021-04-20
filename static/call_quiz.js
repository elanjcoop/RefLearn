$(document).ready(function(){

	$(".quiz-item").addClass("active");
	$(".home-item").removeClass("active");

	$("#search_button").addClass("disabled");
	$("#search_box").attr('disabled', 'disabled');
	$("#search_button").attr('disabled', 'disabled');

	delete_cards()

	$("#question_number").html(`<h1>` + "Question " + current_question + " / " + total_questions + `</h1>`)

	let call = $(document.createElement("h1"))
	call.addClass("question_call")
	call.html(correct_call)
	$("#question_call").append(call)

	for (var i = 0; i < options.length; i++) {
		let button = $(document.createElement("button"))
		if (i == 0) {
			button.html("A")
		} else if (i == 1) {
			button.html("B")
		} else if (i == 2) {
			button.html("C")
		} else {
			button.html("D")
		}
		button.addClass("btn btn-primary special_button")
		button.attr("id", i)
		button.on("click", (e) => {
			submit(button.attr("id"))
		})
		$("#options_row").append(button)

		let gif = $(document.createElement("img"))
		gif.addClass("gif_option")
		gif.attr("src", options[i]["gif"])
		$("#question_gif_row").append(gif)
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
			window.location.href = '/quiz/call'
		}}, 2000)
	}

});