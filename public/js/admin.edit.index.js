const imgsBanner = document.getElementById("imgs-banner")
const smBanner = document.getElementById("submit-banner")
const intro = document.getElementById("intro")
const smIntro = document.getElementById("submit-intro")


smBanner.addEventListener("click", async function(){
	console.log("clicked");
	document.getElementById("mess").innerHTML = ""
	let data = new FormData()
	for(let i=0; i<imgsBanner.files.length; i++){
		data.append("files", imgsBanner.files[i])
	}
	try{
		let mess = await axios.post("http://localhost:3000/admin/edit-banner", data, {
		    headers: {
		      'Content-Type': 'multipart/form-data'
		    }
		})
		console.log("sending");
		if(mess.data.mess == "ok") document.getElementById("mess").innerHTML = "Uploaded!"
		else throw("fail")
	} catch(e) {
		console.error(e);
		document.getElementById("mess").innerHTML = "Error !"
	}
})

smIntro.addEventListener("click", async () => {
	let data = new FormData()
	data.append("intro", intro.value)
	try{
		let mess = await axios.post("http://localhost:3000/admin/edit-intro",data)
		if(mess.data.mess == "ok") document.getElementById("feedback").innerHTML = "Uploaded!"
		else throw("fail")
	} catch(e) {
		console.error(e);
		document.getElementById("mess").innerHTML = "Error !"
	}
})