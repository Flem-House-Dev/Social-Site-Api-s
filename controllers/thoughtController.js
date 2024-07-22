const { User, Thought } = require('../models');

module.exports = {

    // Get all thoughts
    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Get a single thought
    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});

            if(!thought) {
                res.status(404).json({ message: 'No user with that id found' });
                return;
            }

            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Post a thought
    async createThought(req,res) {
        try {

            const newThought = await Thought.create(
               req.body
            );
            console.log("create route");
            const user = await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: newThought._id } },
                { new: true }
            );

            if(!user) {
                res.status(400).json({ message: "Thought created, but user id was not found" });
                return;
            }

            res.json(newThought);
        } catch (error) {
            res.status(500).json(error);
            console.log(error)
        }
    },

    // Update a thought
    async updateThought(req,res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,{
                new: true,
                runValidators: true
                });
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Delete a thought
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
            if(!thought) {
                res.status(400).json({ message: "No thought found with that id" });
                return;
            }
            res.status(200).json({ message: 'Thought successfully deleted'});
        } catch (error) {
            res.status(500).json(error);
        }
    }

}