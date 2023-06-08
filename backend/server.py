from genreAI import genreAI
from flask import Flask, request
from flask_cors import CORS
from web_scrape import page_content
import json


app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def homepage():
  return "This is the homepage"

@app.route('/resource')
def resource():
  return "This is the resource page"

text = "NASA discovers new planet with water"
# @app.route('/recommend')

@app.route('/predict/<predict>')
def predict(predict):
  print("This is from the console/server:", predict)
  result = model.recommend(predict)
  print(result)
  return json.dumps(result)

@app.route('/recommend', methods = ['POST','GET'])
def recommend():
  text = json.loads(request.data)

  print("This is from the console/server:", text)

  result = model.recommend(text)
  print(result)
  return json.dumps(result)


@app.route('/name/<myName>')
def greetName(myName):
  return "Hello " + myName


@app.route('/content', methods = ['POST','GET'])
def content():
  text = json.loads(request.data)

  print("This is from the console/server:", text)

  content = page_content(text)
  print(content)
  print(type(content))

  result = model.recommend(content)
  print(result)
  return json.dumps(result)



# # Python using the AI
categories = ['comp.graphics', 'rec.motorcycles', 'rec.sport.baseball', 'sci.med','sci.space', 'soc.religion.christian', 'talk.politics.mideast']

model = genreAI(categories)

if __name__ == "__main__":
  app.run(host='0.0.0.0')