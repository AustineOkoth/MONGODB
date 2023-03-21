const express = require("express")
const app = express();
const { MongoClient, ObjectId } = require('mongodb')

app.set('view engine', 'ejs');
app.use(express.static('./views'))
app.use(express.json())

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = client.db('basketball').collection('players');

async function connection() {
    await client.connect()
}

app.get(('/player/mostpoints'), async (req, res) => {
    connection();
  
    let cursor = await collection.find().sort({points: -1}).limit(1).toArray()
    //let test = collection.find({points: {$eq: `${test[0].points}`}})

    let mostpoints = []
    cursor.forEach((data) => { 
        mostpoints.push(data)

    })

    console.log(mostpoints);
    res.render('homepage', { alldata: mostpoints })
})

app.get(('/player/mostrebounds'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ rebounds: -1 }).limit(1);
    let mostrebounds = []
    await cursor.forEach((data) => {
        mostrebounds.push(data)
    })
    res.render('homepage', { alldata: mostrebounds })
})

app.get(('/player/mostassists'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ assists: -1 }).limit(1)
    let mostassists = []
    await cursor.forEach((data) => {
        mostassists.push(data)

    })
    res.render('homepage', { alldata: mostassists })
})

app.get(('/player/mostblocks'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ blocks: -1 }).limit(1)
    let mostblocks = []
    await cursor.forEach((data) => {
        mostblocks.push(data)

    })
    res.render('homepage', { alldata: mostblocks })
})

app.get(('/player/allplayers'), async (req, res) => {
    connection();
    const cursor = collection.find().sort({ points: -1 })
    let allplayers = []
    await cursor.forEach((data) => {
        allplayers.push(data)

    })
    res.render('allplayers', { alldata: allplayers })
})

app.listen(8080, () => {
    console.log("http://127.0.0.1:8080");
})
