const { User } = require('../models');

module.exports = {
    
    // Get all users
    async getUsers(req,res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Get one
    async getSingleUser(req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            
            if(!user) {
                console.log("Where is he?");
                res.status(404).json({ message: 'No user with that id found' });
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create user
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
           
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Update user
    async updateUser(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {new: true}
            );
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Delete user
    async deleteUser(req,res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if(!user) {
                res.status(404).json({ message: 'No user with that id found' });
                return;
            }
            res.status(200).json({ message: `${user.userName} has been deleted`})
        } catch (error) {
            res.status(500).json(error);
        }
    }

}