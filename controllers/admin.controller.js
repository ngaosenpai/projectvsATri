const supporter = require("../supporters/upload.banner")
const Banner = require("../models/banner.model")

module.exports.index = (req, res) => {
	res.render("pages/admin")
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
	}
}