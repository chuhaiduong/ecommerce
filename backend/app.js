import express, { Router } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import productRoutes from './routes/product';
import mongoose from 'mongoose';
import userRouter from './routes/auth'
import cors from 'cors';
//
dotenv.config();
const app =express();
app.use(bodyParser.json());
app.use(cors({ credentials: 'same-origin' }));
//connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:false,
    useNewUrlParser: true,
    useUnifiedTopology: true
   
}).then(()=>{
    console.log(`Database connected `)
});

mongoose.connection.on('Error',err=>{
    console.log(`Data connect failed, ${err.massage}`);
});


app.use(express.json());
//Routes
app.use('/api',productRoutes);
app.use('/api',userRouter);
const port= process.env.PORT || 8000;
app.listen(port,() =>{
    console.log('Server is running on port',port)

})