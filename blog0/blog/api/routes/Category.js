const router = require("express").Router();
const Category = require("../models/category");

router.post("/", async (req,res)=>{
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {

        res.status(500).json( err);

    }
})

  
router.get("/", async (req,res)=>{
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json( err);
    }
    
})
module.exports = router;