const { getItems, getItemsSortedById, getItemById, getItemsByHostId, addItem, updateItem, updateActivity, joinActivity, leaveActivity, deleteActivity } = require('../dynamo');

const express = require("express")

const router = express.Router()




router.get('/', async (req, res) => {
    try {
        const activities = await getItems("Activity");
        res.send(activities.Items);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error});
    }
  })

  router.get('/activities/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const activities = await getItemById(id, "Activity");
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

router.get('/activities/getItemsByHostId/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const activities = await getItemsByHostId(id, "Activity");
        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})
  
  router.post('/activities', async (req, res) => {
    const activity = req.body;
    try {
        const newItem = await addItem(activity, "Activity");
        res.json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
  })

  router.put('/activities/addAttendee/', async (req, res) => {
    const activity = req.body;
    try {
        const updatedItem = await joinActivity(activity);
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

router.put('/activities/updateActivitySpecific', async (req, res) => { //updating a specific attribute in an activity
    const activity = req.body;
    try {
        const updatedItem = await updateItem(activity, "Activity");
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

router.put('/activities/updateActivity', async (req, res) => { //updating an activity, but overwrites all attributes
    const activity = req.body;
    try {
        const updatedItem = await updateActivity(activity, "Activity");
        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

router.delete('/activities/leaveActivity/', async (req, res) => {
    const activity = req.body;
    try {
        res.json(await leaveActivity(activity, "Activity"));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})
  
  router.delete('/activities/deleteActivity/', async (req, res) => {
    const jason = req.body;
    try {
        res.json(await deleteActivity(jason));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Something went wrong'});
    }
})

module.exports=router