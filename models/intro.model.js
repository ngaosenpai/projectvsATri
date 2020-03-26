const mongoose = require("mongoose")

const introSchema = new mongoose.Schema({
	content: String,
	status: {type: String, default: "new"},
	time: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Intro", introSchema, "intros")