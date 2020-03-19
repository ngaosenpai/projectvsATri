const Admin = require("../models/admin.model")

module.exports.checkAuth = async (req, res, next) => {
	try{
		if(req.signedCookies.admin_id){
			let admin = await Admin.findById(req.signedCookies.admin_id).exec()
			if(admin) next()
		} else {
			res.redirect("/admin-login")
		}
	} catch(e) {
		res.sendStatus(500)
	}
}