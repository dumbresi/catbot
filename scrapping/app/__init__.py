from flask import Flask

app = Flask(__name__)

from scrapping.app import routes
