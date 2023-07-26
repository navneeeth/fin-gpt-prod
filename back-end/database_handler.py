
# MongoDB connection configuration
import pymongo
import sys
from private import connection_string, DB_NAME, COLLECTION_NAME, API_LOGS_COLLECTION_NAME
# Replace the placeholder data with your Atlas connection string. Be sure it includes
# a valid username and password! Note that in a production environment,
# you should not store your password in plain-text here.

try:
  client = pymongo.MongoClient(connection_string)
  
# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received.")
  sys.exit(1)

# use a database named "fingpt-dev"
db = client[DB_NAME]


def get_question_answer(question_number, question_type):
    collection = db[COLLECTION_NAME]
    query = {
        'Question Number': int(question_number),
        'Type': question_type
    }
    result = collection.find_one(query)

    if result:
        question = result['Question']
        answer = result['Answer']
        return question, answer

    # Raise exception if no matching document found
    raise Exception('No matching document found')

def create_api_log(log_data):
    collection = db[API_LOGS_COLLECTION_NAME]
    collection.insert_one(log_data)
