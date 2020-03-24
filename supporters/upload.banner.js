const admin = require("firebase-admin")
const serviceAccount = require("ServiceAccountKey.json");
const Banner = require("../models/banner.model")
// settup the storage
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-with-tri.firebaseio.com",	
  storageBucket: process.env.BUCKET_URL
});
const bucket = admin.storage().bucket();

module.exports.uploadImageAndSaveToDB = (file) =>  {
	return new Promise((resolve, reject) => {
	  	const { originalname, buffer } = file
		const blob = bucket.file(`${Date.now()}_${originalname.replace(/ /g, "_")}`)
		const blobStream = blob.createWriteStream({
			resumable: false,
			metadata: {
				contentType: file.mimetype 
			}
		})
	    blobStream
	    .on('finish', () => {
		    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
		    //save to DB
		    let banner = new Banner({
		    	url: publicUrl,
		    	alt: "Banner of web"
		    })
		    banner.save()
		    .then(res => resolve(res))
		    .catch(err => reject(err))
	    })
	    .on('error', () => {
	        reject(`Unable to upload image, something went wrong`)
	    })
	    .end(buffer)
	})

}
