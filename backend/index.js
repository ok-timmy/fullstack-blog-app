const express = require ('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./Routes/auth')
const postRoute = require('./Routes/blogPosts')
const refreshRoute = require('./Routes/refresh')
const logoutRoute = require('./Routes/logout')
const allPostsRoute = require('./Routes/allPosts')
var cors = require('cors')
const multer = require('multer')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require('path')
const verifyJWT = require('./Middlewares/verifyJWT')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/public", express.static(path.join(__dirname, "/public")))

const PORT = process.env.PORT;


app.use('/api/auth', authRoute);
app.use('/api/allPost', allPostsRoute)
app.use('/api/logout', logoutRoute)
app.use(verifyJWT);
app.use('/api/refresh', refreshRoute)
app.use('/api/blogPost', postRoute);

// app.use(express.static(path.join(__dirname, "/clientside/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/clientside/build', 'index.html'));
// });


app.listen(PORT || 8000, () => {
    console.log(`My app is listening on port ${PORT} and has listened to Database successfully!`);
})

const storage = multer.diskStorage({destination:(req, file, cb) => {
    cb(null, 'public');
}, filename: (req, file,cb)=>{
    cb(null, req.body.name)
}})

const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"), (req, res)=> {
    res.status(200).json("file has been uploaded")
})


mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(
    console.log('connected to my database')
).catch((err) => console.log(err));