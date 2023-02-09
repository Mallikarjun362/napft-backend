// const express = require("express");
import express from "express";
import { NFT_model } from "./MongoDB_schemas.js";



const app = express()
app.use(express.json());

//Home
app.get("/",(req,res)=>{
    req.send("<h1>Hello Napft Backend</h1>")
})


// NFT - {GET , POST}
app.post("/api/nft", (req, res) => {

    try {
        const nft_data = {
            title: req.body.title, //required
            price: req.body.price, //required
            IPFS_hash: req.body.IPFS_hash, //required
            NFT_token_ID: req.body.NFT_token_ID, //required
            owner_metamask_id: req.body.owner_metamask_id, //required
            creator_metamask_id: req.body.creator_metamask_id, //required
    
            tags: [], //initial-default
            votes: [], //initial-default
            description: "", //initial-default
            transaction_history: [], //initial-default
            date_created: Date(), //initial-default : Today
            image_feature_representation: [], //initla-default
            primary_category: "uncategorized", //initial-default
            price_timeline: [], //initial-default
            trend_number: Math.floor(Math.random() * 100), //initial-default
            media_type: 'image', //initial-default
            view_count: 0, //initial-default
            comments: [], //initial-default
        };
        const temp = new NFT_model({ ...nft_data });
        temp.save();
        res.send(temp);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/api/nft", (req, res) => {
    if (req.body.start === req.body.end) {
        NFT_model.find({ NFT_token_ID: { $eq: req.body.start } }, (err, result) => {
            if (err) {
                res.sendStatus(400);
            } else {
                res.send(result);
            }
        });
    } else {
        NFT_model.find({ NFT_token_ID: { $gte: req.body.start, $lte: req.body.end } }, (err, data) => {
            if (err) { res.sendStatus(400) } else {
                res.send(data);
            }
        });
    }
})

app.listen(3000)
