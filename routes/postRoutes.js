const express = require("express");
const { postModel } = require("../model/postModel");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    try {
        const post = await postModel.find();
        res.send(post);
    }
    catch (err) {
        console.log(err);
        res.send({ "msg": "getting error in post" });
    }
})


postRouter.post("/top", async (req, res) => {
    const payload = req.body;
    try {
        const newPost = new postModel(payload);
        await newPost.save();
        res.send("Post has added");
    }
    catch (err) {
        console.log(err);
        res.send({ "msg": "Error addding while post" });
    }
})


postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const post = await postModel.findOne({ "_id": id });
    const userID_in_post = post.userID;
    const userID_in_req = req.body.userID;
    try {
        if (userID_in_req !== userID_in_post) {
            res.send("you are not authorised");
        }
        else {
            await postModel.findByIdAndUpdate({ "_id": id }, payload);
            res.send("Post has updated")
        }
    }
    catch (err) {
        res.send("Error while updating")
        console.log(err);
    }
})


postRouter.delete("/delete/:id", async (req, res) => {
    // const payload=req.body;
    const id = req.params.id;
    const post = await postModel.findOne({ "_id": id });
    const userID_in_post = post.userID;
    const userID_in_req = req.body.userID;
    try {
        if (userID_in_req !== userID_in_post) {
            res.send("you are not authorised");
        }
        else {
            await postModel.findByIdAndDelete({ "_id": id });
            res.send("Post has deleted")
        }
    }
    catch (err) {
        res.send("Error while removing")
        console.log(err);
    }
})

module.exports = { postRouter };

