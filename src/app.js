const express = require("express");
require("./db/connection")
const MensRanking = require("../src/models/Mens");
const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());

//CREATE
app.post("/mens", async (req,res) =>{
    try{
        const addingMensRecords = new MensRanking(req.body);
        const createRecord = await addingMensRecords.save();
        res.status(201).send(createRecord);
    } catch (error) { res.status(400).send(error) }
})

//GET
app.get("/mens", async (req, res) => {
    try {
        const MensRecord = await MensRanking.find();
        res.send(MensRecord);

    } catch (error) {
        res.status(400).send(error);
    }
})

//GET Specific
app.get("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const MensRecord = await MensRanking.findById(_id);
        if(!MensRecord){
            return res.status(404).send()
        }else{
            res.send(MensRecord);
        }
    } catch (error) {
        res.status(400).send(error);
    }
})


//Update
app.patch("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateMensRecord = await MensRanking.findByIdAndUpdate(_id,req.body,{
            new :true
        });
        res.send(updateMensRecord)
    } catch (error) {
        res.status(400).send(error);
    }
})


// Delete any collection
app.delete("/mens/:id", async (req,res) => {
    try{
        const deleteMensRecord = await MensRanking.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            res.status(400).send()
        }
        res.send(deleteMensRecord);

    }catch(err){
        res.status(500).send(error);
    }
})



app.listen(port, () => {
    console.log(`The server is connected to the port no. ${port}`);
})