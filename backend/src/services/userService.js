const User = require('../models/userModel');
const { connectToDb } = require('../database');
async function addUsers(req, res) {
    const newUsers = await User.create(JSON.parse(req.body));
    res.status(201).json({
        status: 'success',
        data: {
          users: newUsers
        }
      });
}

async function getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      
      res.status(200).json({
        status: 'success',
        data: {
          user
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
};

async function updateUser (req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
  
      res.status(200).json({
        status: 'success',
        data: {
          user
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

async function deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

module.exports = {
    addUsers,
    getUser,
    updateUser,
    deleteUser,
}