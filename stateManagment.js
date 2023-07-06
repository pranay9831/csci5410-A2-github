const express=require('express')
const Firestore= jest.isMockFunction()?require('@google-cloud/firestore').Firestore:require('@google-cloud/firestore')
const cors=require('cors');


require('dotenv').config();
const gcpCredentials=require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const app=express()
app.use(express.json());
app.use(cors({origin:'*'}))
const db=new Firestore({
    projectId: gcpCredentials.project_id,
    credentials: {
      client_email: gcpCredentials.client_email,
      private_key: gcpCredentials.private_key
    }
  });

  app.get('/online-users', async(req,res)=>{
    const users=await db.collection('state-030').where('status', '==',"online").get();
    res.status(200).send(users.docs.map(doc => {
      const data = doc.data();
      return { email: data.email };
    }));

  });

  app.post('/logout', async (req, res)=>{
    const {email}=req.body;
    console.log(email)
    const users=await db.collection('state-030').doc(email).get();
    if(users.data().status=='offline'){
        res.status(200).send('User already logged out');
    }
    else{
        await db.collection('state-030').doc(email).set({email, status:'offline', timestamp:Firestore.FieldValue.serverTimestamp()});
        res.status(200).send('Logged Out successfully');
    }

   
  });
  module.exports=app;

  app.listen(8080, ()=>console.log('listening on port 8080'));