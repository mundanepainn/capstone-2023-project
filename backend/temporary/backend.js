const express = require('express');
const { getUsers, addOrUpdateUser } = require('../api/dynamo');
const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;

app.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
})

app.post('/users', async (req, res) => {
    const user = req.body;
    try {
        const newUser = await addOrUpdateUser(user);
        res.json(newUser);
    } catch (error) {
        console.error(err);
        res.status(500).json({err: 'Something went wrong'});
    }
})

app.listen(port, () => {
    console.log('listening on port ' + port);
})

