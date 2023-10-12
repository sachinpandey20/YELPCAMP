const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities.js');
const {descriptors,places}=require('./seedHelper');

console.log(descriptors,places)
mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=> {
    console.log("Database Connected");
})
const sample =(array)=>array[Math.floor(Math.random() *array.length)]


const seedDB = async() => {
    await Campground.deleteMany({});
    
    for(let i = 0 ; i< 50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 2000) + 5000;
        const camp = new Campground ({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)}  ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, natus. Corporis harum velit odio nemo rerum repellat temporibus fugiat, impedit voluptatibus nesciunt officiis ipsa corrupti adipisci, accusantium enim, aspernatur quisquam!',     
            price
        })  
        await camp.save();
    }
}



seedDB().then(() => {
    mongoose.connection.close();
});