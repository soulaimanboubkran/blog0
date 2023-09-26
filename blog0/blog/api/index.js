const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/Auth.js");
const userRoute = require("./routes/Users")
const postRoute = require("./routes/Posts")
const categoryRoute = require("./routes/Category.js");
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"images")))
mongoose.connect("your mongodb conection url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.log(error);
  });
 
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json(" the File has been uploaded");
}); 

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);

app.listen(27017, () => {
  console.log("Server is running on port 3000");
});
