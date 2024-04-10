const { getItems, getItemsSortedById, getItemById, addItem, updateItem, deleteItem } = require('../dynamo');

const express = require("express")

const router = express.Router()

/* router.get("/",(req,res)=>{

    res.send("API works perfectly");

}) */



router.get('/', async (req, res) => {
    try {
        const chatLog = await getItems("ChatLog");
        res.send(chatLog.Items);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
  })

  router.get('/chatLog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const chatLog = await getItemById(id, "ChatLog");
        res.json(chatLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})
  
  router.post('/chatLine', async (req, res) => {
    const chatLine = req.body;
    try {
        const newItem = await updateItem(chatLine, "ChatLog");
        res.json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
  })

  router.put('/users/', async (req, res) => {
    const chatLog = req.body;
    try {
        const updatedItem = await addItem(chatLog, "ChatLog");
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})



  
  router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteItem(id, "ChatLog"));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

module.exports=router