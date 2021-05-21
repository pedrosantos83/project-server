const express = require('express');
const router = express.Router();
const Destiny = require('../models/destiny-model');
const fileUpload = require ("../configs/cloudinary")

//Get all destinies
router.get("/destiny", async (req, res) => {
  const allDestinies = await Destiny.find().populate("user");
  try {
    res.status(200).json(allDestinies);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});
router.get("/allcities", async (req, res) => {
  try {
  const allDestinations = []
  const allCities = await Destiny.find({}, {city: 1, _id: 0})
  citiesArr = allCities.map(city => city.city)
  citiesArr.forEach(city => allDestinations.push(city))
  
  const allPlaces = await Destiny.find({}, {places: 1, _id: 0})
  const arr = allPlaces.map(place => place.places)
  arr.forEach(array => {
    array.forEach(place => allDestinations.push(place))
  })

    res.status(200).json(allDestinations);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});


router.get("/places/:place", async (req, res) => {
const place = req.params.place
  try {
    const cities = await Destiny.find({city: place})
    console.log(cities)
    res.status(200).json(cities);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Create destiny
router.post("/destiny", async (req, res) => {
  console.log("user", req.user)
  const {  date, city, description, duration, places, imageUrl } = req.body;
  const placesArr = places.split(', ')

  if (!date || !city|| !description || !duration || !places|| !imageUrl) {
    res.status(400).json("missing fields");
    return;
  }

  console.log("user", req.user)

  try {
    const response = await Destiny.create({
      user: req.user,
      date,
      city,
      description,
      duration,
      places: placesArr,
      imageUrl,
      
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Delete destiny

router.delete("/destiny/:id", async (req, res) => {
  try {
    await Destiny.findByIdAndRemove(req.params.id);
    res.status(200).json(`destiny with id ${req.params.id} deleted.`)

  }
  catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }


});
//Get by Id

router.get("/destiny/:id", async (req, res) => {
  try {
    const destiny = await Destiny.findById(req.params.id);
    res.status(200).json(destiny);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Update destinies
router.put("/destiny/:id", async (req, res) => {
  try {
    const { user, date, city, description, duration, places } = req.body;
    const placesArr = places.split(', ')
    Destiny.findByIdAndUpdate(req.params.id, {
      user,
      date,
      city,
      description,
      duration,
      places: placesArr
    });
    res.status(200).json(`destiny with id ${req.params.id} updated.`)
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Upload image to cloudinary
router.post('/upload', fileUpload.single('file'), (req,res) =>{
try{
  res.status(200).json({fileUrl: req.file.path});
}catch(e){
  res.status(500).json(`error occurred ${e}`)
}
});
//SEARCH
router.post("/search", async (req, res) => {
  try {
    const destiny = await Destiny.findById(req.params.id);
    res.status(200).json(destiny);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

module.exports = router;