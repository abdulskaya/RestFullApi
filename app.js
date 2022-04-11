const app = require('express')();
const router = require('./src/routers/router');
const db = require('./src/config/db');

//routers
app.use(router)

app.listen(3000, () => {
    console.log('System is running on 3000');
})