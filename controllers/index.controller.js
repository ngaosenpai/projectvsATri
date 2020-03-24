const Banner = require("../models/banner.model")

module.exports.index = async (req, res) => {
	let banners = await Banner.find({status: "new"})
	res.render("pages/index.pug", {
		banners : banners
	})
}