const { localsName } = require("ejs");
const express = require("express");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const app = express();
app.set('view engine', 'ejs') ;//set the middleware

cloudinary.config({
    cloud_name:"ddradz0tn",
    api_key:"298566919885962",
    api_secret:"Z99FT4h5xzJJy2BNgzGBPHy9TFQ"
})

// middlewares tells to accept json data 
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
//using temp folder to get the string 
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

//for handling url extended form 
app.use(express.urlencoded({extended: true}));


app.post("/mypost", async (req, res) => { 
     console.log(req.body);
     console.log(req.files);
     imageArray = []
     res.send(req.body)

    if (req.files){
     for (index = 0; index < req.files.samplefile.length; index++){

        let result = await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath, {
                folder: "users",
        })

        imageArray.push({
            public_id: result.public_id,
            secure_url: result.secure_url
        })
    }
}
    //this code is for single image upload
    // let file = req.files.samplefile;

    // result = await cloudinary.uploader.upload(file.tempFilePath, {
    //     folder: "users",
    // });


    details = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        imageArray
    }
    console.log(details);
    res.send(details)
});




app.get("/getform", (req, res) => {
    res.render('getform')
})

app.get("/", (req,res)=> {
    res.send("<h1>Hello from Sujay</h1>");
})

//opens form
app.get("/mypostform", (req, res) => {
    res.render("postform");
  });
  
app.listen(4000, () => {
    console.log("running server at 4000");
})

