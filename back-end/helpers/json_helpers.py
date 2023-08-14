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