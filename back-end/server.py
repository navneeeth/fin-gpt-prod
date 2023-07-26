from flask import Flask, request, jsonify
from datetime import datetime
from database_handler import get_question_answer, create_api_log
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the app

@app.route('/', methods = ['GET', 'POST'])
def hello():
    return 'Hello! Welcome to the backend server of FinGPT.'

@app.route('/get-data', methods=['POST'])
def get_data():
    try:
        # Read JSON data from the request
        data = request.get_json()
        timestamp = data.get('timestamp')
        question_number = data.get('question_number')
        question_type = data.get('type')
        
        # Call database_handler.py to get question and answer
        question, answer = get_question_answer(question_number, question_type)
        
        # Log API request details
        processed_timestamp = datetime.now().isoformat()
        status = 'success'
        log_data = {
            'sent_timestamp': timestamp,
            'processed_timestamp': processed_timestamp,
            'status': status,
            'route': 'get-data'
        }
        create_api_log(log_data)
        print('question type: '+question_type)
        print('question_number: '+ str(question_number))
        # Prepare and return the response
        response_data = {
            'status': status,
            'question': question,
            'answer': answer
        }
        return jsonify(response_data), 200

    except Exception as e:
        # Log the error and return an error response
        processed_timestamp = datetime.now().isoformat()
        status = 'failure'
        log_data = {
            'sent_timestamp': timestamp,
            'processed_timestamp': processed_timestamp,
            'status': status,
            'route': 'get-data'
        }
        create_api_log(log_data)

        error_message = 'Error occurred: {}'.format(str(e))
        print(error_message)
        print('question type: '+question_type)
        print('question_number: '+ str(question_number))
        response_data = {'status': status, 'error': error_message}
        return jsonify(response_data), 500

if __name__ == '__main__':
    app.run(debug=True)
