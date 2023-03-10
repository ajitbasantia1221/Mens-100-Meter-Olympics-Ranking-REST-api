const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Olympics", {
    useNewUrlParser : true
}).then( () => {
    console.log("Connection Successfull...");
}).catch( (error) =>{
    console.log("Connection Failed!!");
})