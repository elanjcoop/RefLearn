# import flask
from flask import Flask, url_for

# import jinja template engine
from flask import render_template

from flask import request, jsonify

import json
import random

app = Flask(__name__)

with open("calls.json") as c:
	calls = json.load(c)

current_id = len(calls) + 1

@app.route('/')

def home():
	return render_template('landing.html', calls=calls)

# ------------------------------------------------
@app.route('/call_index')

def call_index():
	return render_template('call_index.html', calls=calls)

# ------------------------------------------------

@app.route('/view/<id>', methods=['GET', 'POST'])

def view(id=None):
	call = {}
	int_id = int(id)

	for i in range(len(calls)):
		if calls[i]["id"] == int_id:
			call = calls[i]
			break

	print(call)

	return render_template('view.html', call=call)

# --------------------------------------------------

@app.route('/search', methods=['POST'])

# We search through call names

def search():
	matches = []
	search_query = request.get_json()

	for call in calls:
			if search_query.lower() in call["call"].lower():
				matches.append(call)
	return jsonify(matches=matches)

# --------------------------------------------------

total_questions = 4
current_question = 0
missed_calls = []
correct_answers = 0
total_options = 4
correct_call_name = ""
correct_option = 0
already_asked = []

@app.route('/quiz_index')

def quiz_index():
	global current_question, missed_calls, correct_answers
	already_asked = []
	current_question = 0
	missed_calls = []
	correct_answers = 0
	return render_template('quiz_index.html')

# ------------------------------------------------

@app.route('/quiz/gif', methods=['GET'])

def gif_quiz():
	global current_question, correct_call_name, correct_option
	current_question += 1
	options = random.sample(calls, total_options)
	while True:
		correct_option = random.randint(0, total_options - 1)
		correct_call_gif = options[correct_option]["gif"]
		correct_call_name = options[correct_option]["call"]
		correct_call_id = options[correct_option]["id"]
		if correct_call_id not in already_asked:
			already_asked.append(correct_call_id)
			break
	return render_template('quiz/gif.html', options=options, correct_call=correct_call_gif, current_question=current_question, total_questions=total_questions)

# --------------------------------------------------

@app.route('/submit_gif', methods=['POST'])

def submit_gif():
	global correct_answers
	answer = request.get_json()
	if correct_option == int(answer):
		correct_answers += 1
	else:
		for call in calls:
			if call["call"] == correct_call_name:
				missed_call_id = call["id"]
				missed_calls.append(tuple([missed_call_id, correct_call_name]))

	if current_question == total_questions:
		return jsonify(done=True, correct_option=correct_option)
	else:
		return jsonify(done=False, correct_option=correct_option)

# --------------------------------------------------

@app.route('/final_score_gif', methods=['GET'])

def final_score_gif():
	return render_template('final_score.html', correct_answers=correct_answers, total_questions=total_questions, missed_calls=missed_calls)