import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from data_processor import get_processed_data
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'Delhi')
    print(f"API REQUEST: Fetching weather for '{city}'")
    try:
        data = get_processed_data(city)
        return jsonify(data)
    except Exception as e:
        print(f"API ERROR: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    try:
        from data_processor import get_city_suggestions
        suggestions = get_city_suggestions(query)
        return jsonify(suggestions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Use the PORT environment variable if available, otherwise default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
