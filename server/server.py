import random, re
from flask import Flask , jsonify , request
from pymongo import MongoClient
from flask_cors import CORS
from pymongo.collection import Collection

app = Flask(__name__)
CORS(app, origins='*')

l=["Apologies, it seems I don't have the information you're looking for. Is there something else I can help you with?😊",
   "I'm sorry, but I couldn't find a specific answer to your request. Can I assist you with anything else?😊",
   "Apologies, it seems I don't have a response for that request. Could you try asking in a different way or inquire about something else?😊"]

url = "mongodb+srv://logeshwarancse20:log123esh@cluster0.zwmyvfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(url)
db=client.Tiruchengode
collection: Collection = None

db1=client.Administor
coll=db1.query
coll1=db1.login

@app.route('/admin',methods=['POST'])
def admin():
    req=request.json
    query=req.get('query','')
    res=[]
    if query[0] == "all" and query[1] == 'all':
        res=list(coll.find({}, {'_id': 0}))

    elif query[0] != "all" and query[1] == 'all': 
        res=list(coll.find({'db':query[0]}, {'_id':0}))

    elif query[0] == 'all' and query[1] == "ans":
        res=list(coll.find({'key':'answered'}, {'_id': 0}))

    elif query[0] != 'all' and query[1] == "ans":
        res=list(coll.find({'db':query[0], 'key':'answered'}, {'_id': 0}))

    elif query[0] == 'all' and query[1] == "nAns": 
        res=list(coll.find({'key':'not answered'}, {'_id': 0}))

    elif query[0] != 'all' and query[1] == "nAns": 
        res=list(coll.find({'db':query[0], 'key':'not answered'}, {'_id': 0}))
    return jsonify(res)
# For Showing all Queries in dashboard


@app.route('/count',methods=['GET', 'POST'])
def count():
    key = 'db'
    value = db.list_collection_names()
    value = [name if name != 'Colleges' else 'others' for name in value]
    count, count1 = list(), list()
    for name in value:
        c = coll.count_documents({key : name , "key":"answered"})
        c1 = coll.count_documents({key : name , "key":"not answered"})
        count.append(c)
        count1.append(c1)
    return jsonify(count,count1,value)
# For Donut Chart in dashboard


@app.route('/profile',methods=['GET', 'POST'])
def profile():
    res=list(coll1.find({}, {'_id': 0}))
    if res:
        return jsonify(res)
    return jsonify({'data':'No'})
# To retrieve username and password to show in dashboard

@app.route('/profileUpdate', methods=['POST'])
def profileUpdate():
    try:
        req = request.json
        check = req.get('check', '')
        res = coll1.find_one({}, {'_id': 0})

        if res:
            if check == 0:
                name = req.get('query', '')
                if res.get('name', '') == name:
                    return jsonify({'data': 'exists'})
                else:
                    filter_query = {'name': res.get('name', '')}
                    update_operation = {'$set': {'name': name}}
                    output = coll1.update_one(filter_query, update_operation)
                    if output.acknowledged:
                        return jsonify({'data': 'updated'})
                    else:
                        return jsonify({'data': 'fail'})
            else:
                password = req.get('query', '')
                if res.get('pass', '') == password:
                    return jsonify({'data': 'exists'})
                else:
                    filter_query = {'pass': res.get('pass', '')}
                    update_operation = {'$set': {'pass': password}}
                    output = coll1.update_one(filter_query, update_operation)
                    if output.acknowledged:
                        return jsonify({'data': 'updated'})
                    else:
                        return jsonify({'data': 'fail'})
        else:
            return jsonify({'data': 'fail'})

    except Exception as e:
        print('Exception', e)
        return jsonify({"error": "invalid query"}), 500
# To change username and password for admin login

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
# For admin login verification

    
@app.route('/chat',methods=['POST'])
def chat():
    global collection
    try:
        req=request.json
        query=req.get('query','').lower()

        if query :
            pattern = r'[^\w\s]'
            clean_query = re.sub(pattern, '', query)
            words = clean_query.split()
            queries = [
                {'key': {'$in': [' '.join(words[i:i+n]) for i in range(len(words)-n+1)]}}
                for n in range(1, len(words) + 1)
            ]

            req_query = {'$or':queries}
            res = []

            if collection is not None:            
                res=list(collection.find(req_query))

            colldb=db["Colleges"]
            res1=list(colldb.find(req_query))
            if res1:
                res = res1
                if 'db' in res[0]:
                    collection=db[res[0]['db']]
            
            if res:
                find = req.get('query','')

                if not coll.find_one({'query':find}):

                    data={
                        "key":"answered",
                        "db":collection.name if collection is not None else "others",
                        "query":find
                    }

                    coll.insert_one(data)

                for item in res:
                    item['_id'] = str(item['_id'])
            
                return jsonify({"data":res})
            else:
                find = req.get('query','')
                if not coll.find_one({'query':find}):

                    data={
                        "key":"not answered",
                        "db":collection.name if collection is not None else "others",
                        "query":find
                    }

                    coll.insert_one(data)

                return jsonify({"data":[{'res':{'c0':random.choice(l)}}]})
            
        else :
            return jsonify({"error":"invalid query"}),400
        
    except Exception as e :
        print("Exception",e)
        return jsonify({"error":"invalid query"}),500
# For chat response   


@app.route('/')
def index():
    return jsonify("server is running")

if __name__ == '__main__':
    app.run(debug=True)