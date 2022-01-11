import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors())

const client = new MongoClient(`mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPW}@cluster0.earoy.mongodb.net/sample_airbnb?retryWrites=true&w=majority`, {useUnifiedTopology: true});

let collection;

app.post("/search", async (req, res, next) => {
    try{
        let result = null;
        if(req.body.query != "")
        {
            result = await collection.aggregate([
                {
                    $search: {
                        "index": "autocomplete",
                        "compound": {
                            "must": [
                                {
                                    "autocomplete": {
                                        "query": `${req.body.query}`,
                                        "path": "name"
                                    }
                                },
                                {
                                    "geoWithin": {
                                        "circle": {
                                            "center": {
                                                "type": "Point",
                                                "coordinates": [req.body.position.lng, req.body.position.lat]
                                            },
                                            "radius": 10000
                                        },
                                        "path": "address.location"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "$project": {
                        "name": 1,
                        "address": 1,
                        "summary": 1,
                        "images": 1,
                        "price": 1,
                        "score": {"$meta": "searchScore"}
                    }
                }
            ]).toArray();
        }
        else
        {
            result = await collection.aggregate([
                {
                    $search: {
                        "index": "autocomplete",
                        "compound": {
                            "must": [
                                {
                                    "geoWithin": {
                                        "circle": {
                                            "center": {
                                                "type": "Point",
                                                "coordinates": [req.body.position.lng, req.body.position.lat]
                                            },
                                            "radius": 10000
                                        },
                                        "path": "address.location"
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "$project": {
                        "name": 1,
                        "address": 1,
                        "summary": 1,
                        "images": 1,
                        "price": 1,
                        "score": {"$meta": "searchScore"}
                    }
                }
            ]).toArray();
        }
        res.send(result);
    }catch(err){
        res.status(500).send({message: err.message});
        console.error(err)
    }
});

app.listen(process.env.PORT || 5000, async() => {
    try{
        await client.connect();
        collection = client.db("sample_airbnb").collection("listingsAndReviews");
    }catch(err){
        console.error(err)
    }
})