import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendingMailTo } from '../utils/mailer';
import { sender } from '../utils/rabbitMq';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  if(data.length == null){
    throw new Error("there is no user")
  }
  else{
    return data; 
  }
};

//create new user
export const userRegistration = async (body) => {
  let saltRounds = 10;
  const hashPass = await bcrypt.hash(body.password, saltRounds);
  body.password = hashPass;

  const existCheck = await User.findOne({email: body.email})
  if(existCheck != null){
    throw new Error("User Exist");
  }
  else {
  const data = await User.create(body);
  sender(data);
  return data;
  }
};

//get single user
export const userLogIn = async (body) => {
  const data = await User.findOne({email: body.email});

 if(data != null){
   const validPassword = bcrypt.compareSync(body.password, data.password);

   console.log(body.password);
   console.log(data.password);
   
   if(validPassword){
    var token = jwt.sign({ email: data.email, id: data._id }, process.env.KEY);
    return token;
   }  
   else{
     throw new Error('password does not match');
   }
 }
 else{
  throw new Error('User not Registered');
 }
};

export const forgetPassword = async (body) => {

  console.log('forgetpassword', body);
  const storedData = await User.findOne({email: body})
  if(storedData.email != null ){
    
    const token = jwt.sign({"email": storedData.email,"id": storedData._id}, process.env.MY_SECRET_KEY );
    const generateMail = sendingMailTo(storedData.email, token);
    console.log("Generated mail ", generateMail);
    return generateMail;
  }
  else{
    throw new Error("Email is not registered")
  }
}

export const resetPassword = async (body) => {
  console.log('reset password', body);
  const hash = bcrypt.hashSync(body.password, 10);
  body.password = hash;
  const resetPass = await User.findByIdAndUpdate({_id: body.userId} ,
  body, 
  {
    new :true
  });
    return resetPass;
  }
