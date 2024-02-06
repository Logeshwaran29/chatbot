from flask import Flask , jsonify , request
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins='*')


client = MongoClient('mongodb://localhost:27017')
db=client.Tiruchengode
collection=db.ksrEng

db1=client.Administor
coll=db1.query

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
            if res:
                data={
                    "key":"answered",
                    "query":req.get('query','')
                }

                coll.insert_one(data)

                for item in res:
                    item['_id'] = str(item['_id'])
            
                return jsonify({"data":res})
            else:
                data={
                    "key":"not answered",
                    "query":req.get('query','')
                }

                coll.insert_one(data)
                
                out=list(collection.find({'key':'error'}))
                for item in out:
                    item['_id'] = str(item['_id'])

                return jsonify({"data":out})
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
