const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express ();
require('dotenv').config();

app.use (cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bkf4wz6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run (){
    try{
        const categoryCollections = client.db('jobPortal').collection('categoryCollection');
        const jobCollections = client.db('jobPortal').collection('jobCollection');
        const companyCollections = client.db('jobPortal').collection('companyCollection');

        app.get('/category', async(req,res)=>{
            const query={};
            const cursor = categoryCollections.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });

        app.get('/category/:id', async(req,res)=>{
            const id = req.params.id;
            const query ={_id:ObjectId(id)};
            const product = await jobCollections.findOne(query);
            res.send(product);
        })

        app.get('/allJob', async(req,res)=>{
            const query={};
            const cursor = jobCollections.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });

        app.get('/allJob/:id',async(req,res)=>{
            const id = req.params.id;
            const query ={categoryId:(id)}
            const result= await jobCollections.find(query).toArray();
            res.send(result);

        });

        app.get('/company', async(req,res)=>{
            const query={};
            const cursor = companyCollections.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });


       
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/',async(req,res)=>{
    res.send ('Job Portal Server is Running')
})

app.listen(port, ()=>console.log(`Job Portal Server is Running on ${port}`))