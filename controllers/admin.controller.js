const supporter = require("../supporters/upload.banner")
const Banner = require("../models/banner.model")
const Intro = require("../models/intro.model")

module.exports.index = (req, res) => {
	res.render("pages/admin", {
		page: "none"
	})
}
module.exports.index2 = (req, res) => {
	if(req.params.page == "edit-index"){
		res.render("pages/admin", {
			page: "index"
		})
	}
}

module.exports.exec = async (req, res) => {
	if(req.params.key == "edit-banner"){
		let files = req.files
		if(files.length != 0){
			await Banner.updateMany({status: "new"}, {status: "old"})
			Promise.all(files.map(file => {
				return supporter.uploadImageAndSaveToDB(file)
			}))
			.then(results => res.json({mess: "ok"}))
			.catch(err => res.json({mess: "fail"}))
		} else {
			res.json({mess: "no file choosen"})
		}
	} else if(req.params.key == "edit-intro"){
		await Intro.updateMany({status: "new"}, {status: "old"})
		let intro = new Intro({content: req.body.intro})
		intro.save()
		.then(result => res.json({mess: "ok"}))
		.catch(err =>  res.json({mess: "fail"}))
	} else res.sendStatus(404)
}