module.exports.index = (req, res) => {
	res.render("pages/admin-login", {
		message: ""
	})
}

module.exports.pass = (req, res) => {
	res.cookie("admin_id", res.locals.adminId, {
		signed: true
	})
	res.redirect("/admin")
}