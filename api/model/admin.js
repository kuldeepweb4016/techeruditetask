const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
})


const adminData = mongoose.model("admin", adminSchema);
module.exports = adminData;