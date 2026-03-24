from flask import Flask, jsonify
from flask_cors import CORS
from data_processor import get_processed_data

app = Flask(__name__)
CORS(app) # Enable CORS for frontend interaction

@app.route('/api/weather', methods=['GET'])
def get_weather():
    try:
        data = get_processed_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
