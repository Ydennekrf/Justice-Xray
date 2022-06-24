const { User } = require('../models');

const userSeed = [
    {
        username: "",
        email: "",
        password: ""
    },
    {
        username: "",
        email: "",
        password: ""
    },
    {
        username: "",
        email: "",
        password: ""
    },
    {
        username: "",
        email: "",
        password: ""
    }
]

const userSeeding = () => User.bulkCreate(userSeed);


module.exports = userSeeding;