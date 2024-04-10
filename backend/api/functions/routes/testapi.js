const { getItems, getItemsSortedById, getItemById, addItem } = require('../dynamo');

const express = require("express")

const router = express.Router()

/* router.get("/",(req,res)=>{

    res.send("API works perfectly");

}) */



router.get('/', async (req, res) => {
    try {
        const users = await getItems("User");
        // const userIDs = users.Items
        // const userItems = users.Items.sort((a, b) => a.id - b.id)
        // const userItems = users.Items.sort((a, b) => a.name.localeCompare(b.name));
       /*  userItems.sort((a, b) => a.id - b.id);
        const userIDs = userItems.map(x => x.id).sort() */
        // array.sort((a, b) => a.id - b.id)
        // const userIDs = array.map(x => x.id)
        /* array.sort((a, b) =>  a - b) */
        // x.sort((a, b) => a.name - b.name)
        /* xName = x.map( obj => obj.name)
        let xSorted = xName.sort();
        xReversed = xSorted.reverse();
        console.log(typeof xSorted) */
        res.send(users.Items);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
  })

  router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const users = await getItemById(id, "User");
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})
  
  router.post('/users', async (req, res) => {
    const user = req.body;
    try {
        const newUser = await addItem(user, "User");
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
  })

  router.put('/users/:id', async (req, res) => {
    const user = req.body;
    const { id } = req.params;
    user.id = id;
    try {
        const updatedUser = await addOrUpdateItem(user, "User");
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})
  
  router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteItem("User", id));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

module.exports=router