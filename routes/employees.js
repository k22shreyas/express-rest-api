var express = require("express")
var router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      id: 33,
      name: "employee1",
      email: "skjdhfg@sds.com",
      phone: "4759647",
    },
    {
      id: 45,
      name: "empkisrs34",
      email: "ldkgskl@slgmks",
      phone: "454356465"
    }
  ])
})

module.exports = router;