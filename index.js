require('dotenv').config();
const express  = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const Message = require('./models/message');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://react-crud-client-chi.vercel.app",
  "https://react-crud-client-84ygdc06g-team-learn2.vercel.app",
  ...(process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Blocked by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

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