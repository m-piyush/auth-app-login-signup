const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Auth')

router.get('/', ensureAuthenticated, (req, res) => {
    console.log("user data", req.user);

    res.status(200).json([
        {
            name: "moblie",
            price: 10000
        },
        {
            name: "TV",
            price: 20000
        }
    ])
})


module.exports = router;