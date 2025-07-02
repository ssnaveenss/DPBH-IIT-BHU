from flask import Flask, request, jsonify
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

random_forest_model = joblib.load('darkpattern_model_deceptive1.pkl')
vectorizer = joblib.load('vectorizer1.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        sample_input_dummy=data.get('allTexts', [])
        sample_input=[]
        count=0
        for i in sample_input_dummy:
            count+=1
            sample_input.append(i["text"])
        
        sample_input_vectorized = vectorizer.transform(sample_input)
        sample_prediction = random_forest_model.predict(sample_input_vectorized)
        sample_predicted_dummy1 = [{'text': text, 'prediction': prediction} for text, prediction in zip(sample_input, sample_prediction)]
        response_data = {
            'predictionResults': sample_predicted_dummy1
        }
        return jsonify(response_data), 200
        

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

if __name__ == '_main_':
    app.run(debug=True)