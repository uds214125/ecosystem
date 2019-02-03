'use strict';
const ObjectID = require('mongodb').ObjectID;
const Config = {};
Config.find =  async(req, res)=>{
    const db = req.app.locals.db;
    
    await db.collection('ecosys').find().toArray(function(err, result) {
        if (err) throw err;
        if(result.length > 0) {
                res.status(200).send(result);
        } 
    });
}

Config.update =  async(req, res)=>{
    const db = req.app.locals.db;
    console.log(' : req.body : ', req.body)
    const { _id, Type, Category, Breed, Height, Weight, Food, Speed, Color } = req.body;
    const whereQuery = { "_id":  ObjectID(_id)};
    const dataToBePatch = { $set:  {Type: Type, Category: Category, Breed: Breed, Height: Height, Weight:Weight, Food:Food, Speed:Speed, Color:Color} };
    await db.collection('ecosys').updateOne(whereQuery, dataToBePatch, function(err, doc) {
        if (err) throw err;
        else {
            console.log(' results updated : ', doc.result );
            if(doc.result.n >0 ) {

                res.status(200).send({code: 200, status: true});
            }
            req.on('end', ()=>{
                // db.close();
            })
        }
    });
}

module.exports = Config;