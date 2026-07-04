const express=require("express")
require("dotenv").config();
const chatRoutes=require("./routes/chatRoutes")
const cors=require("cors");
const connectDb=require("./config/db")
const app=express();
connectDb();;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("STUDENT DOUBT SOLVING IS RUNNING");
});

app.use("/api/v1/chats",chatRoutes);
 const PORT=process.env.PORT || 5001;
 app.listen(PORT,()=>{
     //console.log(`Server started at $+PORT`);
     console.log(`Server started at ${PORT}`);
 });
