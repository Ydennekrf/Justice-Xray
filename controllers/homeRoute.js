const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment } = require('../models');


router.get('/', (req, res) => {
    console.log(req.body)

    Post.findAll({
        attributes: ['id','title','post_txt'],
        include: [{
            model: Comment,
            attributes:['id','user_id', 'post_id', 'comment_txt' ],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
    })
    .then(dbpost => {
        // const post = dbpost.map(post => post.get({ plain: true }));
        // render home here
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;

