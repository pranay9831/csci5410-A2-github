const express=require('express')
const Firestore = jest.isMockFunction() ? require('@google-cloud/firestore').Firestore : require('@google-cloud/firestore');

require('dotenv').config()
const gcpCredentials=require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const app = express();
const cors=require('cors');
app.use(cors({origin:"*"}));
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

    if(email==='' || password===''){
        res.status(400).send({res:"Both needs to be added"})
    }
    else{
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
                res.status(201).send(JSON.stringify({response:'Success Login'}))
            }
            
    
            else{
                res.status(400).send(JSON.stringify({response:'Invalid Credentials'}))
            }
        }
        else{
            
            res.status(400).send({response:'Invalid Credentials'})
        }
        
    }

    console.log(password, email)
    
    
    
    
     })
   
    module.exports=app;
     app.listen(3000, ()=>console.log('Server running on port 3000'));