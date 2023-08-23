from flask import Flask, request, jsonify
from datetime import datetime
from database_handler import get_question_answer, create_api_log
from flask_cors import CORS

import helpers.csv_helpers as csv_helpers
import helpers.openai_helpers as openai_helpers
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


@app.route('/validate-file', methods=['POST'])
def validate_file():
    try:
        
        # Check if a file was uploaded
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        print('File uploaded')
        file = request.files['file']

        # Check if the file has a filename
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Check if the file is a CSV file
        if not csv_helpers.is_csv(file):
            return jsonify({'error': 'File is not a CSV'}), 400
        print('File is a CSV')
        # Read and parse the CSV data
        csv_data = file.read().decode('utf-8')
        
        # Check if the CSV data is readable
        if not csv_helpers.is_csv_data_readable(csv_data):
            return jsonify({'error': 'CSV data is not readable'}), 400
        print('File is readable')
        # Check if the CSV has more than 100 rows
        if csv_helpers.has_more_than_100_rows(csv_data):
            return jsonify({'error': 'CSV has more than 100 rows'}), 400
        print('File data is accurate')
        # Call the isRelevant() function with page_name parameter
        page_name = request.form.get('page_name')
        
        if page_name is None:
            return jsonify({'error': 'Missing page_name parameter'}), 400
        print('Page name parameter exists')
        openai_id = request.form.get('openai-id')
        validation_status = openai_helpers.validate_openai_id(openai_id)
        if validation_status['status'] == 'error':
            return validation_status
        print('OpenAI key validated')
        result = openai_helpers.isRelevant(page_name, openai_id, csv_data)
        
        if result:
            return jsonify({'status': 'success', 'result': result})
        else:
            return jsonify({'status': 'error', 'message': 'The file data is not relevant to the current page.'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/validate-openai-id', methods=['POST'])
def validate_openai_id_route():
    data = request.get_json()
    openai_id = data.get('openai-id')

    if openai_id is None:
        return jsonify({'status': 'error', 'message': 'Missing openai-id parameter'}), 400

    result = openai_helpers.validate_openai_id(openai_id)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
