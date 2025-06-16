const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stkPush = require('./stk');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/stk', async (req, res) => {
    const { phone } = req.body;
    try {
        const result = await stkPush(phone);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/callback', (req, res) => {
    console.log('STK Callback:', JSON.stringify(req.body));
    res.status(200).send('Callback received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});