const express = require('express');
const app = express();
const port = 3000;



app.listen(port, () => {
    console.log(`Article service listening on port ${port}`);
})