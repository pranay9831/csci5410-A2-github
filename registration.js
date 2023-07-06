const express= require('express');
const Firestore = jest.isMockFunction() ? require('@google-cloud/firestore').Firestore : require('@google-cloud/firestore');

const cors=require('cors')

require('dotenv').config();
const gcpCredentials=require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const app = express();
 app.use(express.json());
app.use(cors({origin:'*'}));
 const db=new Firestore({
  projectId: gcpCredentials.project_id,
  credentials: {
    client_email: gcpCredentials.client_email,
    private_key: gcpCredentials.private_key
  }
});


app.post('/register', async(req, res)=>{
const{name, password, email, location }= req.body;

const data={
    name,
    password,
    email,
    location
};
console.log(data)
console.log(req.body)
if(email===""){
  res.status(400).send("enter value")
}
else{

  const docRef=db.collection('Reg-030').doc(email);
const doc=await docRef.get();
if(doc.exists){
    res.status(400).send('Email already Exists')
}
else{
    docRef.set(data);
    const state={
      email,
      status:'offline',
      timestamp:Firestore.FieldValue.serverTimestamp()

  }
  await db.collection('state-030').doc(email).set(state);
  
    res.status(201).send({response:'User Registration Successful'})
}


}


 })
module.exports=app;
 app.listen(3001, ()=>console.log('Server running on port 3001'));