const mongoose=require("mongoose");
const contactSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require: true
            
        },
        email:{
            type : String,
            require : true
        }
    }
);

const Contact = new mongoose.model("contact",contactSchema);

module.exports = Contact;