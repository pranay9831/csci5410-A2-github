const express=require('express')
const Firestore= require('@google-cloud/firestore')
require('dotenv').config()
const gcpCredentials=require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const app = express();
app.use(express.json());
const db=new Firestore({
    projectId: gcpCredentials.project_id,
    credentials: {
      client_email: gcpCredentials.client_email,
      private_key: gcpCredentials.private_key
    }
  });


  app.post('/login', async(req, res)=>{
    const{ password, email }= req.body;
    
    const data={
        
        password,
        email
        
    };
    
    const docRef=db.collection('Reg-030').doc(email);
    const doc=await docRef.get();
    if(doc.exists){
        if(password===doc.data().password)
        {

            const state={
                email,
                status:'online',
                timestamp:Firestore.FieldValue.serverTimestamp()

            }
            await db.collection('state-030').doc(email).set(state);
            res.status(201).send('Success Login')
        }
        

        else{
            res.status(400).send('Invalid Credentials')
        }
    }
    else{
        docRef.set(data);
        res.status(400).send('Invalid Credentials')
    }
    
    
    
     })
    
     app.listen(3000, ()=>console.log('Server running on port 3000'));