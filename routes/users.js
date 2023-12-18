var express = require("express");
const {
  getUsers,
  createUser,
  updateUserById,
  getUserById,
  deleteUserById,
} = require("../controllers/users.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getUsers);

router.post("/", createUser);

router.get(`/:id`, getUserById);

router.put("/:id", updateUserById);

//TODO: DELETE method of http
router.delete("/:id", deleteUserById);

//TODO: PUT vs PATCH
/*
  {
    id: 1,
    name: "don",
    email: "email@gmail.com",
    phone: "42069"
  },

  using PUT if we have to update a field like id then we will have to proceed the entire object such as name and phone also but in PATCH we can update only the required field such as id or name
*/

module.exports = router;
