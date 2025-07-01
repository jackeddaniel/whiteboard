const express = require('express')
const app = express()
const port = 7000

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req,res) => {
    res.send(path.join(__dirname,'public','index.html'));
});

app.listen(port, () => {
    console.log(`listening on port 7000`)
});
