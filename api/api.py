import google.generativeai as genai
from flask import Flask , render_template , request , jsonify , redirect , url_for
from flask_cors import CORS
import os 

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST','GET'])
def home():
    if request.method == "POST":
        user = request.form['prompt']
        genai.configure(api_key=os.environ["API_KEY"])
        model = genai.GenerativeModel(model_name='gemini-1.5-flash')
        history=[]
        chat = model.start_chat(history=history)
        while True: 
            response = chat.send_message(user)
            
            history.append({"parts": [user],"role":"user"})
            history.append({"parts":[response.text], "role":"model"})
            
            return response.text
            #return jsonify(history)

if __name__ == '__main__':
    app.run(debug=True)
