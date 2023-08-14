import openai
from csv_helpers import read_csv_to_string
from json_helpers import parse_json_status

def validate_openai_id(openai_id):
    try:
        openai.api_key = openai_id
        models = openai.Model.list()
        return {'status': 'success'}

    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def isRelevant(page_name, openai_id, file):
    # Your implementation of the isRelevant() function goes here
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo-16k",
    messages=[
        {"role": "system", "content": "You are a backend server, responding strictly in JSON with a status 'success' if the data entered by the user is even a little relevant to the domain of "+page_name 
         + " and status: 'failure' if it is not."},
        {"role": "user", "content": "Data: "+read_csv_to_string(file)}
    ]
    )
    print(response['choices'][0]['message']['content'])
    return parse_json_status(response['choices'][0]['message']['content'])