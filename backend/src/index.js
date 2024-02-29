const express = require('express');
const { addUsers, getUser, updateUser, deleteUser } = require('./services/userService');
// const { connectToDb } = require('./database');


const app = express();
const router = express.Router();
app.use(express.json());
// app.use(connectToDb);
app.use('/', router);



router.route('/users').post(addUsers);
router
  .route('users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);


app.listen(3000);