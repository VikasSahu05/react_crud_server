const mongoose = require('mongoose');
const Message = require('../models/Message');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

//POST /api/messages

exports.createMessage = async(req,res) => {
    try{
        const {name,email,message} = req.body;
        if(!name || !email || !message){
            return res.status(400).json({error:"All fields are required"});
        }

        const saved = await Message.create({name,email,message});
        return res.status(201).json({message:"Message created successfully",data:saved});
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({error:"Email already exists"});
        }
        return res.status(500).json({error:"Internal server error"});
    }
};

//Get /api/messages

exports.getAllMessages = async(req,res) => {
    try{
        const messages = await Message.find().sort({createdAt:-1});
        return res.status(200).json({message:"Messages fetched successfully",data:messages});
    }catch(error){
        return res.status(500).json({error:"Internal server error"});
    }
}

//Get /api/messages/:id

exports.getMessageById = async (req, res) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id" });
      }
      const item = await Message.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Message not found" });
      }
      return res.status(200).json({ data: item });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  // PUT /api/messages/:id
exports.updateMessage = async (req, res) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id" });
      }
      const { name, email, message } = req.body;
      const updated = await Message.findByIdAndUpdate(
        req.params.id,
        { name, email, message, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ error: "Message not found" });
      }
      return res.status(200).json({ message: "Updated", data: updated });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: error.message });
    }
  };
  // DELETE /api/messages/:id
  exports.deleteMessage = async (req, res) => {
    try {
      if (!isValidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id" });
      }
      const deleted = await Message.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Message not found" });
      }
      return res.status(200).json({ message: "Deleted", data: deleted });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };