const { Post } = require('../models');

const postSeed = [
    {
        title: "techy titles",
        post_txt: "testing these posts",
        user_id: 1       
    },
    {
        title: "testing number 2",
        post_txt: "again testing posts",
        user_id: 2
    },
    {
        title: "more testing",
        post_txt: "just a few more tests i swear",
        user_id: 3
    },
    {
        title: "yet another test",
        post_txt: "yep its another",
        user_id: 2
    },
    {
        title: "okay last one possibly",
        post_txt: "5 should be enough maybe?",
        user_id: 1
    }
]

const postSeeding = () => Post.bulkCreate(postSeed);

module.exports = postSeeding;