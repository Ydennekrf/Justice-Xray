const { User } = require('../models');

const userSeed = [
    {
        username: "superMario",
        email: "email@email.com",
        password: "pass123"
    },
    {
        username: "mushMallow",
        email: "mush@email.com",
        password: "pass321"
    },
    {
        username: "jimboJones",
        email: "bones@email.com",
        password: "password"
    },
    {
        username: "heavenyHash",
        email: "hash@email.com",
        password: "wordpass"
    }
]

const userSeeding = () => User.bulkCreate(userSeed);


module.exports = userSeeding;