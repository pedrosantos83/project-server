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

//Create destiny
router.post("/destiny", async (req, res) => {
  const {  date, city, description, duration, places, imageUrl } = req.body;
  if (!date || !city|| !description || !duration || !places|| !imageUrl) {
    res.status(400).json("missing fields");
    return;
  }

  try {
    const response = await Destiny.create({
      user: req.user,
      date,
      city,
      description,
      duration,
      places,
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
    Destiny.findByIdAndUpdate(req.params.id, {
      user,
      date,
      city,
      description,
      duration,
      places,
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
module.exports = router;