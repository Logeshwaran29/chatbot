from flask import Flask , jsonify
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS , cross_origin 

app=Flask(__name__)
CORS(app, origins='*', supports_credentials=True)

client = MongoClient('mongodb://localhost:27017')
db=client.Tiruchengode
collection=db.ksrEng

@app.route('/chat',methods=['POST'])
@cross_origin(supports_credentials=True)
def chat(req):
    res = collection.find({'key': {'$elemMatch': {'$eq': req}}}) 
    output=[document.get('res',None) for document in res]
    data=json_util.dumps(output)
    print(data)
    return jsonify(data)

@app.route('/')
def index():
    return jsonify("server is running")

if __name__ == '__main__':
    app.run(debug=True)

