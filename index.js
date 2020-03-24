//config
require('dotenv').config(); //read enviroment variables in .env file
const express = require("express")
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");

//connect to database
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify : false
})



const loginAdmin = require("./routers/admin.login.router")
const adminRouter = require("./routers/admin.router")
const authorized = require("./middlewares/authorized.admin")
const controller = require("./controllers/index.controller")
let app = express();

//set view engine
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))

app.use(cookieParser(process.env.SECRET_KEY)) //use cookieParser middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", controller.index)

app.use("/admin-login", loginAdmin)
app.use("/admin", authorized.checkAuth, adminRouter)

app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`);
})