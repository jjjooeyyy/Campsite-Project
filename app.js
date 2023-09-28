const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/campsiteDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=> {
    res.render('home.ejs');
})

app.get('/makecampground',async(req,res)=> {
    const camp = new Campground({title:'My backyard',description:'cheap campsite'});
    await camp.save();
    res.send(camp);
})

app.listen(3000, ()=> {
    console.log('ON Port 3000!');
})