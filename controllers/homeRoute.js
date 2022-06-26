const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment } = require('../models');

// renders home page
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
        const post = dbpost.map(post => post.get({ plain: true }));
        res.render('home', {
            post, loggedIn: req.session.loggedIn
        });
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// takes you to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
// takes you to new user page
router.get('/newUser', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('createUser');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_txt'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_txt', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
    {
        model: User,
        attributes: ['username']
    }]
    })
    .then(dbPost => {
        if (dbPost === false) {
            res.status(404).json({ message: 'id not found'});
            return;
        }
        res.render('newPost', {
            post, loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;
