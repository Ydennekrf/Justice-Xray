const {Comment} = require('../models');

const commentSeed = [
    {
        user_id: 1,
        post_id: 1,
        comment_txt: "this is a comment!"
    },
    {
        user_id: 2,
        post_id: 2,
        comment_txt: "this is another comment!"
    },
    {
        user_id: 3,
        post_id: 3,
        comment_txt: "Look at this thing!"
    },
    {
        user_id: 2,
        post_id: 3,
        comment_txt: " more filler comments!"
    },
    {
        user_id: 1,
        post_id: 2,
        comment_txt: " here is another comment about stuff and things!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_txt: "blah blah blah blah blah blah blah its a comment"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_txt: " more more more more more more more more more more commments"
    }
]

const commentSeeding = () => Comment.bulkCreate(commentSeed);

module.exports = commentSeeding