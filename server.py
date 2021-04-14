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
	return render_template('index.html', calls=calls)



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

@app.route('/quiz', methods=['GET'])

def quiz():
	questions = random.sample(calls, 2)
	question_calls = []
	all_call_options = []

	for question in questions:
		question_calls.append(question["call"])


	for call in calls:
		if call["call"] in question_calls:
			pass
		else:
			all_call_options.append(call["call"])
	print(questions)
	print(all_call_options)

	return render_template('quiz.html', questions=questions, all_call_options=all_call_options)

# --------------------------------------------------

@app.route('/send_results', methods=['POST'])

def send_results():
	form_answers = request.get_json()
	missed_calls = []
	answers_correct = 0

	if form_answers["ans_a"] == form_answers["selected_a"]:
		answers_correct += 1
	else:
		missed_calls.append(form_answers["ans_a"])
	if form_answers["ans_b"] == form_answers["selected_b"]:
		answers_correct += 1
	else:
		missed_calls.append(form_answers["ans_b"])

	missed_ids = []
	for call in calls:
		if call["call"] in missed_calls:
			missed_ids.append(call["id"])

	return jsonify(answers_correct=answers_correct, missed_ids=missed_ids)