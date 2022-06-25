const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    console.log(req.body)
})

module.exports = router;