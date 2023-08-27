import openai
from helpers.csv_helpers import read_csv_to_string
from helpers.json_helpers import parse_json_status, process_answer_JSON

def validate_openai_id(openai_id):
    try:
        openai.api_key = openai_id
        models = openai.Model.list()
        return {'status': 'success'}

    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def is_relevant(page_name, openai_id, file):
    # Your implementation of the isRelevant() function goes here
    print(page_name)
    openai.api_key = openai_id
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k",
    messages=[
        {"role": "system", "content": "You are a backend server, responding strictly in JSON with a status 'success' or a status 'failure'." },
        {"role": "user", "content": "If the data entered below is strictly relevant to the domain of "+page_name + " and is a CSV with readable columns, return status 'success'."
         +" Return status: 'failure' if there are no column names. \n Data: "+file}
       # {"role": "user", "content": "Data: "+read_csv_to_string(file)}
    ],
    temperature= 1.3
    )
    print('GPT Response:')
    print(response['choices'][0]['message']['content'])
    return parse_json_status(response['choices'][0]['message']['content'])

def answer_user_query(openai_id, file_path, question):
    openai.api_key = openai_id
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "system", "content": "You are a backend server, a Finance Expert, responding in JSON format with two keys: 'status' and 'message'. You will strictly follow these guidelines when processing financial CSV data and answering questions. For a given question, if it is relevant to the data and the data is sufficient to infer an answer, you will reply with 'status': 1 and provide the answer to the question in the 'message' key. Otherwise, if there is an error or a shortcoming in the data, your 'status' will be 0, and you will provide details about the issue in the 'message' value."},
            {"role": "user", "content": "Question:" + question + " Data: "+read_csv_to_string(file_path)}
        ]
    )
    
    # Get the GPT response content
    gpt_response = response['choices'][0]['message']['content']
    
    # Process the JSON response
    status, message = process_answer_JSON(gpt_response)
    
    # Print the processed status and message
    print('Status:', status)
    print('Message:', message)

    # You can return status and message or use them as needed in your application
    return status, message