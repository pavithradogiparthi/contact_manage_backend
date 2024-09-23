const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./schema.js");

const cors = require('cors');



const app = express();
app.use(cors());


app.use(express.json());

app.get("/contacts",async (req,res)=>{
    try{
        var contacts = await Contact.find();
        res.status(200).json(contacts);
    }catch(err){
        res.status(400).json({"message":err});
    }
});

app.post("/contacts",async (req,res)=>{
    try{
        var contact  = req.body;
        const newContact = new Contact(contact);
        console.log(newContact);
        await newContact.save()
        res.status(200).json(contact);
    }catch(err){
        res.status(400).json({"message":err});
    }
});

app.get("/contacts/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        var contacts = await Contact.find({"_id":id});
        res.status(200).json(contacts);
    }catch(err){
        res.status(400).json({"message":err});
    }
});

// app.put("/contacts/:id",async (req,res)=>{
//     const id = req.params.id;
//     const contact = req.body;
//     console.log(contact);
//     try{
//         if (!mongoose.Types.ObjectId.isValid(id))
//             return res.status(404).send("No contact with that id");
        
//           const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
//             new: true,
//           });
//           res.status(200).json(updatedContact);
//     }catch(err){
//         res.status(500).json({"message":"Internal server"});
//     }
    
// });
app.put("/contacts/:id", async (req, res) => {
    const id = req.params.id;
    const contact = req.body;
    console.log(contact);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No contact with that id");
        }

        const updatedContact = await Contact.findByIdAndUpdate(id, contact, {
            new: true,
            runValidators: true,  // Ensure validation of updated fields
        });

        if (!updatedContact) {
            return res.status(404).send("No contact found with that id");
        }

        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(500).json({ "message": "Internal Server Error" });
    }
});


app.delete("/contacts/:id",async (req,res)=>{
    const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No contact found");
  try{
    await Contact.findByIdAndDelete(id);

    res.json({ message: "Contact Deleted Successfully" });
  }catch(err){
    console.log(err);
    res.json({message:err});
  }
})

mongoose.connect("mongodb+srv://pavithradogi:pavithra@nodeblog.sulwj.mongodb.net/?retryWrites=true&w=majority").then(()=>{app.listen(5000);});
