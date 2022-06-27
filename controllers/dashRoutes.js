const router = require('express').Router();
const sequelize = require('../config/connections');
const { Post, User, Comment } = require('../models');
const auth = require('../utils/authenticate');


router.get('/', auth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post_txt'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_txt', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },{
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbpost => {
      const posts = dbpost.map(post => post.get({ plain:true }));
      res.render('dash', {posts, loggedIn: true});  
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('edit/:id', auth, (req,res) => {
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
        },{
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbpost => {
        if(!dbpost) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        const posts = dbpost.get({ plain: true });
        res.render('editPost', {
            posts,
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/create', auth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post_txt'],
        incluse: [{
            where: Comment,
            attributes: ['id', 'comment_txt', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },{
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbpost => {
        const posts = dbpost.map(post => post.get({ plain: true }));
        res.render('newPost', { posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;