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
coll1=db1.login

@app.route('/admin',methods=['POST'])
def admin():
    req=request.json
    query=req.get('query','')
    res=[]
    if query== "all":
        res=list(coll.find({}, {'_id': 0}))
    elif query == "ans":
        res=list(coll.find({'key':'answered'}, {'_id': 0}))
    elif query == "nAns": 
        res=list(coll.find({'key':'not answered'}, {'_id': 0}))
    return jsonify(res)

@app.route('/login',methods=['POST'])
def login():

    try:
        req=request.json
        name=req.get('name','')
        password=req.get('password','')
        res=coll1.find_one({'name':name})

        if res :
            if res.get('pass', '') == password : return jsonify({'data':'ok'})
            else : return jsonify({'data':'wrong pass'})
        
        else : return jsonify({'data':'wrong user'})

    except Exception as e :
        print("Exception",e)
        return jsonify({"error":"invalid query"}),500
    
@app.route('/chat',methods=['POST'])
def chat():

    try:
        req=request.json
        query=req.get('query','').lower()

        if query :
            words = query.split()
            queries = [
                {'key': {'$in': [' '.join(words[i:i+n]) for i in range(len(words)-n+1)]}}
                for n in range(1, len(words) + 1)
            ]

            req_query = {'$or':queries}
            
            res=list(collection.find(req_query))

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
