const { getItems, getItemsSortedById, getItemById, addItem, deleteItem } = require('../dynamo');

const express = require("express")

const router = express.Router()

/* router.get("/",(req,res)=>{

    res.send("API works perfectly");

}) */



router.get('/', async (req, res) => {
    try {
        const reviews = await getItems("Review");
        res.send(reviews.Items);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
  })

  router.get('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const reviews = await getItemById(id, "Review");
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})
  
  router.post('/reviews', async (req, res) => {
    const reviews = req.body;
    try {
        const newItem = await addItem(reviews, "Review");
        res.json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
  })

/*   router.put('/users/:id', async (req, res) => {
    const reviews = req.body;
    const { id } = req.params;
    reviews.id = id;
    try {
        const updatedItem = await addOrUpdateItem("Review", reviews);
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
}) */
  
  router.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteItem(id, "Review"));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

module.exports=router