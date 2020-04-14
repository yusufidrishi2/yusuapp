from flask import Flask, request, make_response
from flask_cors import CORS, cross_origin
import json
from jsonschema import validate
from data_management import DataManagement

app = Flask(__name__)

class API:

    def __init__(self):
        pass

    def start():
        # The Incoming request must be in one of these formats
        with open('/home/imerit/yusuapp/backend/input-data-schema.json', 'r') as f:
            API.input_data_schema = json.load(f)

        # Cors initialization for cross origin
        cors = CORS(app, resources={r"/object-tracker-api/*": {"origins": "*"}})
        app.config['CORS_HEADERS'] = 'Content-Type'

        # app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=True, ssl_context='adhoc')
        # app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=True)
        app.run()


    # Funtion to validate the json
    def validate_json(input_json, input_schema):
        try:
            validate(input_json, schema=input_schema)

        except Exception as e:
            print('\n[INFO] JSON does not match = ', e, flush=True)
            return False

        return True

# Main function where API hits first
@app.route('/chat-api', methods=['POST'])
@cross_origin(origin='*')
def return_tracked_annotations():

    try:
        payload = request.json
        print('\n[INFO] Received json = ', payload, type(payload), flush=True)

        if payload:
            if API.validate_json(input_json=payload, input_schema=API.input_data_schema):
                print('\n[INFO] First schema matched', flush=True)

                try:
                    obj_data = DataManagement()
                    response = obj_data.logic(body=payload)
                    return json.dumps(response)

                except Exception as e:
                    print("\n[INFO] Error in code = ", e, flush=True)
                    return make_response('Error 400 Bad Request: Code unable to send the result.')

            else:
                print("\n[INFO] JSON schema doesn't matched", flush=True)
                return make_response('Error 400 Bad Request: The JSON you provide is not matching with the schema.')

        else:
            print("\n[INFO] Not a JSON", flush=True)
            return make_response('Error 400 Bad Request: The request you made is not a JSON.')

    except Exception as e:
        print("\n[INFO] Not a valid JSON = ", e, flush=True)
        return make_response('Error 400 Bad Request: The request you made is not a valid JSON.')