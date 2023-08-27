import json

def parse_json_status(json_string):
    try:
        data = json.loads(json_string)
        status = data.get('status')

        if status == 'success':
            return True
        elif status == 'failure':
            return False
        else:
            return False  # Default to returning False for unknown status values

    except json.JSONDecodeError:
        return False

def process_answer_JSON(json_string):
    try:
        # Parse the JSON string
        data = json.loads(json_string)

        # Check if the JSON contains 'status' and 'message' keys
        if 'status' in data and 'message' in data:
            status = data['status']
            message = data['message']
            return status, message
        else:
            # If the keys are missing, return an error status and message
            return 0, "Invalid JSON format: 'status' and 'message' keys are missing."

    except json.JSONDecodeError as e:
        # Handle JSON parsing errors
        return 0, f"JSON parsing error: {str(e)}"
    except Exception as e:
        # Handle other exceptions
        return 0, str(e)