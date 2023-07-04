const express=require('express')
const Firestore= require('@google-cloud/firestore')


require('dotenv').config();
const gcpCredentials=require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const app=express()
app.use(express.json());
const db=new Firestore({
    projectId: gcpCredentials.project_id,
    credentials: {
      client_email: gcpCredentials.client_email,
      private_key: gcpCredentials.private_key
    }
  });

  app.get('/online-users', async(req,res)=>{
    const users=await db.collection('state-030').where('status', '==',"online").get();
    res.status(200).send(users.docs.map(doc=>doc.id));

  });

  app.post('/logout', async (req, res)=>{
    const {email}=req.body;
    const users=await db.collection('state-030').doc(email).get();
    if(users.data().status=='offline'){
        res.status(200).send('User already logged out');
    }
    else{
        await db.collection('state-030').doc(email).set({email, status:'offline', timestamp:Firestore.FieldValue.serverTimestamp()});
        res.status(200).send('Logged Out successfully');
    }

   
  });

  app.listen(8080, ()=>console.log('listening on port 8080'));