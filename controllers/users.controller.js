exports.getUsers = (req, res, next) => {
  console.log("Inside getUsers");
  User.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: err.message || "Some error occurred while fetching",
      });
    });
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const userDao = new User(req.body);
  userDao
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => {
      res.json({
        message: err.message || "Some error occured while creating user",
      });
    });
};

exports.getUserById = (req, res, next) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message:
          err.message ||
          `Some error occured while fetching user by id: ${req.params.id}`,
      });
    });
};

exports.updateUserById = (req, res, next) => {
  console.log(res.params.id);
  console.log(req.body);
  User.findOneAndUpdate({ _id: req.params.id}, req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.json({
        message:
          err.message ||
          `Some error occured while fetching user by id: ${req.params.id}`,
      });
    })
};

exports.deleteUserById = (req, res, next) => {
  res.status(200).json({
    message: `User with ID ${req.params.id} deleted successfully`,
  });
};
