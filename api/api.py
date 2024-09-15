import google.generativeai as genai
from flask import Flask , render_template , request , jsonify , redirect , url_for
import os 

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello World!'