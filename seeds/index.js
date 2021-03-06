const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DATABASE CONNECTED");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "621ba5d145aa5163ea158cc9",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dolpxtgrj/image/upload/v1646269111/YelpCamp/hqnacwgzuwpc0ltsx2pa.jpg",
          filename: "YelpCamp/hqnacwgzuwpc0ltsx2pa",
        },
        {
          url: "https://res.cloudinary.com/dolpxtgrj/image/upload/v1646269112/YelpCamp/srjeg2x0w2ym7rbn1two.jpg",
          filename: "YelpCamp/srjeg2x0w2ym7rbn1two",
        },
      ],
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit nam, assumenda asperiores alias consectetur itaque minus rem deserunt? Cupiditate qui modi autem magni ea similique laudantium quam dolorem omnis amet!",
      price,
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
