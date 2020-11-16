const express = require('express');
const router = express.Router();


//Item model
const Item = require('../../models/Item');

// @route GET api/items
// @desc GET All items
// @access Public
router.get('/',  (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err =>  {err});
});

// @route POST api/items
// @desc POST Create Item
// @access Private
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
    .then(item => res.json(item))
    .catch(err =>  {err});
});

// @route DELETE api/items/:id
// @desc DELETE Delete Item
// @access Private
router.delete('/:id' , (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success : true})))
    .catch(err => res.status(404).json({success: false}));

 })

 router.put('/:id', (req,res) => {
    Item.findByIdAndUpdate({_id:req.params.id}, req.body,  {new: true})
    .then(item => res.json(item))
    .catch(err =>  {err});
 })

module.exports = router;