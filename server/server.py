from flask import Flask,jsonify
from pymongo import MongoClient
from bson import json_util

app=Flask(__name__)

client = MongoClient('mongodb://localhost:27017')
db=client.Tiruchengode
collection=db.ksrEng

@app.route('/')
def index():
    # res=collection.find({'key':'admission details'})
    res = collection.find({'key': {'$elemMatch': {'$eq': 'ug'}}})

    output=[document.get('res',None) for document in res]
    data=json_util.dumps(output)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

