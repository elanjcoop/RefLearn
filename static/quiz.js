$(document).ready(function(){

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
		var duplicate_options = all_call_options;
		shuffle(duplicate_options)


		var multiple_a_option_a = $("<option></option>").attr("value", "question_a_option_a").text(duplicate_options[0]);
		var multiple_a_option_b = $("<option></option>").attr("value", "question_a_option_b").text(questions[0]["call"]);
		var multiple_a_option_c = $("<option></option>").attr("value", "question_a_option_c").text(duplicate_options[1]);
		var multiple_a_option_d = $("<option></option>").attr("value", "question_a_option_d").text(duplicate_options[2]);
		$("#multiple_a").append(multiple_a_option_a)
		$("#multiple_a").append(multiple_a_option_b)
		$("#multiple_a").append(multiple_a_option_c)
		$("#multiple_a").append(multiple_a_option_d)
		var multiple_b_option_a = $("<option></option>").attr("value", "question_b_option_a").text(duplicate_options[3]);
		var multiple_b_option_b = $("<option></option>").attr("value", "question_b_option_b").text(duplicate_options[4]);
		var multiple_b_option_c = $("<option></option>").attr("value", "question_b_option_c").text(duplicate_options[5]);
		var multiple_b_option_d = $("<option></option>").attr("value", "question_b_option_d").text(questions[1]["call"]);
		$("#multiple_b").append(multiple_b_option_a)
		$("#multiple_b").append(multiple_b_option_b)
		$("#multiple_b").append(multiple_b_option_c)
		$("#multiple_b").append(multiple_b_option_d)
	}

	function delete_cards() {
		$("#nav_row").html("")
	}

	//Fisher-Yates shuffle
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
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