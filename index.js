const app = require('./app'); //calling express
const config = require('./config/config');//configuring mongo db
const mongoose = require('mongoose');
const { homeRoute, userRoute, adminRoute } = require('./routes');

//Routes
app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() =>
    console.log('mongoose connected succesfully'),
    app.listen(config.PORT, () => {
        console.log(`server is running in port ${config.PORT}`);
    })
);