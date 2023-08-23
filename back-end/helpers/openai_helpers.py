import openai
from helpers.csv_helpers import read_csv_to_string
from helpers.json_helpers import parse_json_status

def validate_openai_id(openai_id):
    try:
        openai.api_key = openai_id
        models = openai.Model.list()
        return {'status': 'success'}

    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def isRelevant(page_name, openai_id, file):
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