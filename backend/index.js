const express = require ('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./Routes/auth')
const postRoute = require('./Routes/post')
var cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
// app.use("/public", express.static(path.join(__dirname, "/public")))

const PORT = process.env.PORT;


mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(
    console.log('connected to my database')
).catch((err) => console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.get('/', function (req, res) {
    res.send("This is my first Express line!!")
    console.log('I am damn happy!')
});

app.use(express.static(path.join(__dirname, "/clientside/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/clientside/build', 'index.html'));
});


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


