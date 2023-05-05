import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import PostRoutes from './routes/post.js'
import AuthRoutes from './routes/Auth.js'
import UserRoutes from './routes/User.js'
import ConversationRoutes from './routes/Conversation.js'
import MessageRoutes from './routes/Message.js'
import path from 'path'

const app = express();

const __dirname = path.resolve();/*require for deployment*/
dotenv.config();

app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cors());

app.use('/api/posts',PostRoutes);
app.use('/api/auth',AuthRoutes);
app.use('/api/user',UserRoutes);
app.use('/api/conversations',ConversationRoutes);
app.use('/api/messages',MessageRoutes);

app.use(express.static(path.join(__dirname,"../client/build")));
app.get("/*",function(req,res){
  res.sendFile(
    path.join(__dirname,"../client/build/index.html"),
  );
});

mongoose.set("strictQuery",false);
const PORT = process.env.PORT || 5000;

// const CONNECTION_URL = 'mongodb+srv://books_resale:Sagar%401206@cluster0.pmtakm7.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology:true})
	.then(()=>app.listen(PORT,()=>console.log(`Server is running on a PORT : ${PORT}`)))
	.catch((error) => console.log(`${error} did not connect`));