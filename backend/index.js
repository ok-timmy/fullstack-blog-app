const express = require ('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./Routes/auth')
const postRoute = require('./Routes/post')
var cors = require('cors')

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = 8000 || process.env.PORT

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


app.listen(PORT, () => {
    console.log(`My app is listening on port ${PORT} and has listened to Database successfully!`);
})


// app.post('/register', function(req, res) {
//     res.send('')
// })
