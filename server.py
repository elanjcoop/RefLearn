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

@app.route('/quiz_index')

def quiz_index():
	return render_template('quiz_index.html')

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

@app.route('/gif_quiz', methods=['GET'])

def gif_quiz():
	questions = random.sample(calls, 2)
	all_call_options = []
	question_calls = []

	for question in questions:
		question_calls.append(question["call"])

	for call in calls:
		if call["call"] in question_calls:
			pass
		else:
			all_call_options.append(call["call"])

	random.shuffle(all_call_options)

	call_options_a = [all_call_options[0], all_call_options[1], all_call_options[2], questions[0]["call"]]
	random.shuffle(call_options_a)
	call_options_b = [all_call_options[3], all_call_options[4], all_call_options[5], questions[1]["call"]]
	random.shuffle(call_options_b)

	print(questions)

	return render_template('gif_quiz.html', questions=questions, call_options_a=call_options_a, call_options_b=call_options_b)

# --------------------------------------------------

@app.route('/send_results_gif', methods=['POST'])

def send_results_gif():
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

# --------------------------------------------------

@app.route('/call_quiz', methods=['GET'])

def call_quiz():
	questions = random.sample(calls, 2)
	all_call_options = []
	question_calls = []

	for question in questions:
		question_calls.append(question["call"])

	for call in calls:
		if call["gif"] in question_calls:
			pass
		else:
			all_call_options.append(call["gif"])

	random.shuffle(all_call_options)

	call_options_a = [all_call_options[0], all_call_options[1], all_call_options[2], questions[0]["gif"]]
	random.shuffle(call_options_a)
	call_options_b = [all_call_options[3], all_call_options[4], all_call_options[5], questions[1]["gif"]]
	random.shuffle(call_options_b)

	print(questions)

	return render_template('call_quiz.html', questions=questions, call_options_a=call_options_a, call_options_b=call_options_b)

# --------------------------------------------------

@app.route('/send_results_call', methods=['POST'])

def send_results_call():
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
		if call["gif"] in missed_calls:
			missed_ids.append(call["id"])

	return jsonify(answers_correct=answers_correct, missed_ids=missed_ids)

# --------------------------------------------------

@app.route('/rules_quiz', methods=['GET'])

def rules_quiz():
	questions = random.sample(calls, 2)
	all_call_options = []
	question_calls = []

	for question in questions:
		question_calls.append(question["call"])

	for call in calls:
		if call["call"] in question_calls:
			pass
		else:
			all_call_options.append(call["call"])

	random.shuffle(all_call_options)

	call_options_a = [all_call_options[0], all_call_options[1], all_call_options[2], questions[0]["call"]]
	random.shuffle(call_options_a)
	call_options_b = [all_call_options[3], all_call_options[4], all_call_options[5], questions[1]["call"]]
	random.shuffle(call_options_b)

	print(questions)

	return render_template('rules_quiz.html', questions=questions, call_options_a=call_options_a, call_options_b=call_options_b)

# --------------------------------------------------

@app.route('/send_results_rules', methods=['POST'])

def send_results_rules():
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