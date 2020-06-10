const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const app = express();

app.listen(PORT, () => {
    console.log('Referral API server is running on PORT:', PORT);
})