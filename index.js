import express from "express";
import { MongoClient } from "mongodb";


 //import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URL);
//process.env is a n object
//env-environmental variables
//this will put the url inside the variable caled process.env

//import { MongoClient } from "mongodb";
//const fs=require("fs");
// fs.unlink("./delete-me.css",(err)=>
// {
//   if(err)
//   {
//     console.log(err)
//   }
//   else{
//     console.log("completed updating🎂");
//   }
// })

//const express = require('express');//3rd party
const app = express();
const PORT = process.env.PORT;
 app.listen(PORT,function()
 {
 console.log("server started successfully");

});
//"mongodb://localhost:27017"-V16 & before

//v16+

// const MONGO_URL = "mongodb://localhost";
//const MONGO_URL = "mongodb://127.0.0.1"; //  nodejs - 16+
const MONGO_URL = process.env.MONGO_URL;

//mongodb+srv://rhagavi:rhagR@2703@cluster0.ubm2h.mongodb.net
//mongodb+srv://rhagavi:rhagR@2703@cluster0.ubm2h.mongodb.net

// Node - MongoDB
async function createConnection() {
  //mongoClient is used in importing
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

//calling the function createConnection
const client = await createConnection();

app.use(express.json()); //global middle ware,INtercept and
//convert body to json.
//intercept all the req
//app.use is a bouncer.
//app.use will convert body to json
//evn if we create multiple post req,since its global
//we can use that same app.use.

app.get("/movies", async function (req, res) {
  //db.movies.find({})
  console.log(req.query);
  if (req.query.rating) {
    // const rating=parseInt(req.query.rating);
    // console.log(rating);
    req.query.rating = +req.query.rating;
  }
  const movies = await client
    .db("movie")
    .collection("movie")
    .find(req.query)
    .toArray(); //converting cursor to array
  res.send(movies);
});

//i get from the get repo as events{} and events count{}
//@returns {Promise<string>}
app.get("/movies/:id", async function (req, res) {
  const  id  = req.params.id;
  //console.log(id);
  const movie = await client
    .db("movie")
    .collection("movie")
    .findOne({ id: id });

  console.log(movie); //key id is in 115 line and value id is in path line-111
  movie ? res.send(movie) : res.status(404).send({ msg: "movie not found" });
});
//body->JSON--use express.js as middle ware
//in the middle of path and function
//removed middleware express.json and sent to globally.

app.post("/movies", async function (req, res) {
  const data = req.body;
  //insert db command
  //result-client
  const result = await client.db("movie").collection("movie").insertOne(data);

  res.send(result);
});

app.put("/movies/:id", async function (req, res) {
  const id = req.params.id;

  //console.log(req.params.id);
  const data = req.body;
  console.log(data);

  const result = await client
    .db("movie")
    .collection("movie")
    .updateOne({ id: id }, { $set: data });
  console.log(result);
  result.modifiedCount > 0
    ? res.send({ msg: "movie successfully updated" })
    : res.status(400).send({ msg: "movie not updated" });
});

//body->JSON--use express.js as middle ware
//in the middle of path and function
//removed middleware express.json and sent to globally.

app.delete("/movies/:id", async function (req, res) {
  const id = req.params.id;

  const result = await client
    .db("movie")

    .collection("movie")
    .deleteOne({ id: id });
  //key id is in 115 line and value id is in path line-111
  result.deletedCount > 0
    ? res.send({ msg: "movie successfully deleted" })
    : res.status(404).send({ msg: "movie not found" });
});

app.listen(PORT, () => console.log(`App is started in ${PORT}`));

//console.log(req.params);
//key id can be anything
//id watever passed as dynamic value in path its given as value

//     const movie=movies.find((mv)=>mv.id===id);
// console.log(movie);
//find returns a cursor
//cursor is a pagination.
//pagination only gives top 20 in mongo
//if wanted to convert cursor to an array by using to array.

//body->JSON--use express.js as middle ware
//in the middle of path and function
//removed middleware express.json and sent to globally.

//To hide the password-new package
//.env
