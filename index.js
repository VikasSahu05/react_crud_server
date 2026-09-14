require('dotenv').config();
const express  = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const Message = require('./models/message');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
    origin: corsOrigins,
    credentials: true
  }));

app.use(express.json());
app.use('/api/messages',messageRoutes);

app.get('/', (req,res)=>{
    res.json({message : "Hello World"})
});

// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })

app.get("/health", (req,res)=>{
    res.status(200).json({
        status:"Healthy",
        uptime:process.uptime(),
        timestamp:new Date().toISOString(),
    });
});

// app.post("/test", async (req, res) => {
//     try {
//       const { name, email, message } = req.body;
  
//       if (!name || !email || !message) {
//         return res.status(400).json({
//           error: "All fields are required",
//         });
//       }
  
//       const saved = await Message.create({ name, email, message });
  
//       return res.status(201).json({
//         message: "Message saved successfully",
//         data: saved,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         error: "Failed to save message",
//         details: error.message,
//       });
//     }
//   });

  
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})