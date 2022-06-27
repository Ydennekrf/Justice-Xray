const router = require('express').Router();
const {Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connections');
const auth = require('../../utils/authenticate');

//get all posts
router.get('/', (req,res) => {
    Post.findAll({
        attributes: ['id','title','post_txt'],
        include: [
            {
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
            }
        ]
    })
    .then(dbpost => res.json(dbpost))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//get post by id
router.get('/:id', (req,res) => [
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_txt'],
        include: [{
            model: User,
            attributes: ['username']
        },{
        model: Comment,
        attributes: ['id', 'comment_txt', 'post_id', 'user_id'],
        include: {
            model: User,
            attributes: ['username']
        }
    }]
    })
    .then(dbpost => {
        if(!dbpost) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.json(dbpost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        })  
]);

router.get('/', auth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_txt: req.body.post_txt,
        user_id: req.session.user_id
    })
    .then(dbpost => res.json(dbpost))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', auth, (req,res) => {
    Post.update({
        title: req.body.title,
        post_txt: req.body.post_txt
    },{
        where: {
            id: req.params.id
        }
    })
    .then(dbpost => {
        if(!dbpost) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.json(dbpost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', auth, (req,res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbpost => {
        if (!dbpost) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.json(dbpost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;

