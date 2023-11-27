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
    
    for(let i = 0 ; i< 15 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 2000) + 5000;
        const camp = new Campground ({
            //your user ID
            author: '655cf6f2a610638f6a867303',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)}  ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, natus. Corporis harum velit odio nemo rerum repellat temporibus fugiat, impedit voluptatibus nesciunt officiis ipsa corrupti adipisci, accusantium enim, aspernatur quisquam!',     
            price,
            geometry: { 
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dc0w8w48d/image/upload/v1700862959/Yelpcamp/ig2cgwb2854mc7tr5lh5.png',
                  filename: 'Yelpcamp/ig2cgwb2854mc7tr5lh5',
                },
                {
                  url: 'https://res.cloudinary.com/dc0w8w48d/image/upload/v1700862962/Yelpcamp/qujhvdz6frbbxad8ldaz.png',
                  filename: 'Yelpcamp/qujhvdz6frbbxad8ldaz',
                }
              ]
        })  
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});