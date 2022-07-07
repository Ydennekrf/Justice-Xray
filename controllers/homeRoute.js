const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment } = require('../models/Index');
// localhost:3001/
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
// localhost:3001/login
// takes you to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
// localhost:3001/createUser
// takes you to new user page
router.get('/createUser', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('createUser');
});
//localhost:3001/newPost
// router.get('/newPost', (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect('/newPost');
//         return;
//     }
//     res.render('newPost');
// });
// localhost:3001/post/
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
        if (!dbPost) {
            res.status(404).json({ message: 'id not found'});
            return;
        }
        const post = dbPost.get({ plain: true }); 
        res.render('singlePost', {
            post, loggedIn: req.session.loggedIn
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;

