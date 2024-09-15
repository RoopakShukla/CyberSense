import google.generativeai as genai
from flask import Flask , render_template , request , jsonify , redirect , url_for
import os 

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello World!'

@app.route('/login', methods=['POST'])
def login():
    user = request.form('username')
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=8000,debug=True)
