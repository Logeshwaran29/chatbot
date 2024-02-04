# from flask import Flask , jsonify , request
# from pymongo import MongoClient
# from flask_cors import CORS


# app = Flask(__name__)
# CORS(app, origins='*')


# client = MongoClient('mongodb://localhost:27017')
# db=client.Administor
# collection = db.query

# @app.route('/admin',methods=['GET', 'POST'])
# def admin():
#     req=request.json
#     collection.insert_one(req)

#     res=list(collection.find({}, {'_id': 0}))
#     return jsonify(res)

# @app.route('/')
# def index():
#     return jsonify("server is running")

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask , jsonify
from pymongo import MongoClient
from bson import json_util
from flask_cors import CORS

app=Flask(__name__)
CORS(app, origins='*', supports_credentials=True)

client = MongoClient('mongodb://localhost:27017')
db=client.Tiruchengode
collection=db.ksrEng

@app.route('/chat',methods=['POST'])
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
