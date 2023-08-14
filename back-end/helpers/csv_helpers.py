import csv

def is_csv(file):
    return file.filename.endswith('.csv')

def is_csv_data_readable(csv_data):
    try:
        csv_reader = csv.reader(csv_data.splitlines())
        headers = next(csv_reader)
        return True
    except csv.Error:
        return False

def has_more_than_100_rows(csv_data):
    csv_reader = csv.reader(csv_data.splitlines())
    num_rows = sum(1 for _ in csv_reader)
    return num_rows > 100

def read_csv_to_string(file_path):
    data_string = ""

    with open(file_path, newline='') as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            data_string += ','.join(row) + '\n'

    return data_string