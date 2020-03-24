const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
	url: String,
	alt : String,
	status: {type: String, default: "new"}
})

module.exports = mongoose.model("Banner", bannerSchema, "banners")