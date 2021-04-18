$(document).ready(function(){

	$(".quiz-item").addClass("active");
	$(".home-item").removeClass("active");

	$("#search_button").addClass("disabled");
	$("#search_box").attr('disabled', 'disabled');
	$("#search_button").attr('disabled', 'disabled');

	delete_cards()
	display_custom()
	display_options()
	
	function display_custom() {

		for (var i = 0; i < questions.length; i++) {
			let section = $(document.createElement("section"))
			let card = $(document.createElement("div"))
			let card_body = $(document.createElement("div"))
			section.addClass("col-xl-2")
			section.addClass("index_section")
			card.addClass("card")
			card.addClass("h-100")
			card_body.addClass("card-body")
			let img = $(document.createElement("img"))
			img.attr("src", questions[i]["gif"])
			//img.attr("alt", questions[i]["alt"])
			img.addClass("player_card_image")
			card.append(img)
			card.append(card_body)
			section.append(card)
			$("#quiz_row").append(section)
		}

	}

	function display_options() {

		var multiple_a_option_a = $("<option></option>").attr("value", "question_a_option_a").text(call_options_a[0]);
		var multiple_a_option_b = $("<option></option>").attr("value", "question_a_option_b").text(call_options_a[1]);
		var multiple_a_option_c = $("<option></option>").attr("value", "question_a_option_c").text(call_options_a[2]);
		var multiple_a_option_d = $("<option></option>").attr("value", "question_a_option_d").text(call_options_a[3]);
		$("#multiple_a").append(multiple_a_option_a)
		$("#multiple_a").append(multiple_a_option_b)
		$("#multiple_a").append(multiple_a_option_c)
		$("#multiple_a").append(multiple_a_option_d)
		var multiple_b_option_a = $("<option></option>").attr("value", "question_b_option_a").text(call_options_b[0]);
		var multiple_b_option_b = $("<option></option>").attr("value", "question_b_option_b").text(call_options_b[1]);
		var multiple_b_option_c = $("<option></option>").attr("value", "question_b_option_c").text(call_options_b[2]);
		var multiple_b_option_d = $("<option></option>").attr("value", "question_b_option_d").text(call_options_b[3]);
		$("#multiple_b").append(multiple_b_option_a)
		$("#multiple_b").append(multiple_b_option_b)
		$("#multiple_b").append(multiple_b_option_c)
		$("#multiple_b").append(multiple_b_option_d)
	}

	function delete_cards() {
		$("#nav_row").html("")
	}

	
	$("#quiz_form").submit(function(e) {

		e.preventDefault();
		var form = $(this);
		var url = form.attr('action');

		form_answers = {
			"ans_a": questions[0]["call"],
			"ans_b": questions[1]["call"],
			"selected_a": $("#multiple_a option:selected").text(),
			"selected_b":  $("#multiple_b option:selected").text()
		}


		
		$.ajax({
        	type: "POST",
        	url: url,
        	data: JSON.stringify(form_answers),
        	dataType: 'json',
			contentType: 'application/json; charset=utf-8',
    		success: function(result) {
    			$("#missed_row").html("")
    			console.log(result)
    			$("#answers_row").html("Score: " + result["answers_correct"])
    			for (var i = 0; i < result["missed_ids"].length; i++) {
    				//$("#missed_row").append(result["missed_ids"][i])
    				var a = $(document.createElement("a"))
    				a.attr("href", "/view/" + result["missed_ids"][i])
    				a.html(result["missed_ids"][i])
    				$("#missed_row").append(a)
    			}

    			if (result["missed_ids"].length == 0) {
    				$("#missed_row").html("Nice Job! Perfect Score!")
    			}
    			
    		},
    		error: function(request, status, error) {
		    	console.log('Error');
		      	console.log(request);
		    	console.log(status);
		    	console.log(error);
			}
		});
         

	})

});