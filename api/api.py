import google.generativeai as genai
from flask import Flask , render_template , request , jsonify , redirect , url_for
import os 

app = Flask(__name__)

@app.route('/home')
def home():
    return 'Hello World!'

@app.route('/login', methods=["GET","POST"])
def login():
    return 'logged in'

if __name__ == '__main__':
    app.run(port=8000,debug=True)