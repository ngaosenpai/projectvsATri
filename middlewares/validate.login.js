const Admin = require("../models/admin.model")

const bcrypt = require("bcrypt")

module.exports.validate = async (req, res, next) => {
	try{
		let admin = await Admin.findOne({username: req.body.username}).exec()
		if(!admin) throw "wrong username"
		else {
			let check = await bcrypt.compare(req.body.password, admin.password)
			if(!check) throw "wrong password"
			else {
				res.locals.adminId = admin._id
				next()
			}
		}
	} catch(e) {
		res.render("pages/admin-login", {
			message: e
		})
	}
}