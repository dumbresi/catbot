from flask import request, jsonify
from scrapping import app
from scrapping.scraper import get_cat_data

@app.route('/get_cat_info', methods=['GET'])

def get_cat_info():
    cat_name = request.args.get('name')
    if not cat_name:
        return jsonify({'error': 'Missing cat name'}), 400

    try:
        data = get_cat_data(cat_name)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

