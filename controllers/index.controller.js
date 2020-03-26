const Banner = require("../models/banner.model")
const Intro = require("../models/intro.model")

module.exports.index = async (req, res) => {
	Promise.all([
		Banner.find({status: "new"}).exec(), 
		Intro.findOne({status: "new"}).exec()
		])
	.then(results => {
		res.render("pages/index.pug", {
			banners : results[0],
			intro: {
				content: results[1].content.substr(0,300),
				date: new Date(results[1].time)
			}
		})
	})
	.catch(e => {
		console.error(e);
	})
}