const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/moon-project", () => {
    console.log('Database connected')
}).catch(err => {
    console.log('Database connect error: ', err)
});

module.exports = mongoose;
