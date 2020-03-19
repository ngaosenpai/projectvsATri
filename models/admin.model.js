const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	permission: mongoose.Schema.Types.Mixed,
	mail: String
})

const Admin = mongoose.model("Admin", adminSchema, "admins")

module.exports = Admin