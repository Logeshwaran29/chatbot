from flask import Flask , jsonify , request
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins='*')


client = MongoClient('mongodb://localhost:27017')
db=client.Tiruchengode
collection=db.ksrEng

# @app.route('/admin',methods=['GET', 'POST'])
# def admin():
#     req=request.json
#     collection.insert_one(req)

#     res=list(collection.find({}, {'_id': 0}))
#     return jsonify(res)

@app.route('/chat',methods=['POST'])
def chat():

    try:
        req=request.json
        query=req.get('query','').lower()

        if query :
            res=list(collection.find({'key':{'$in':[query]}}))
            for item in res:
                item['_id'] = str(item['_id'])
            
            return jsonify({"data":res})
        else :
            return jsonify({"error":"invalid query"}),400
        
    except Exception as e :
        print("Exception",e)
        return jsonify({"error":"invalid query"}),500
    

@app.route('/')
def index():
    return jsonify("server is running")

if __name__ == '__main__':
    app.run(debug=True)
