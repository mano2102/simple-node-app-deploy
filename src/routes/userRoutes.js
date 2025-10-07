const express = require('express');
const authMiddleWare = require('../middleware/auth');
const router = express.Router();


router.get("/", authMiddleWare, (req, res) => {
    res.status(200).json({ message: "This is samepl request" })
})



module.exports = router;