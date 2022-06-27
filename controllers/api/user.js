const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const auth = require('../../utils/authenticate');
// gets all users
router.get('/', (req,res) => {
    User.findAll({})
    .then(dbcomment => res.json(dbcomment))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// gets user data with posts and comments specific to the user
router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: ['id', 'title', 'post_txt', 'created_at']
        },{
            model: Comment,
            attributes: ['id', 'title', 'post_txt', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }]
    })
    .then(dbUser => {
        if(!dbUser) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.json(dbUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


// creates a new user in DB
router.post('/', auth, (req,res) => {
    if (req.session) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        .then(dbUser => {
            req.session.save(() => {
                req.session.user_id = dbUser.id;
                req.session.username = dbUser.username;
                req.session.loggedIn = true;
                res.json(dbUser);
            })
        })
    }
});
// creates session cookie for log in
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUser => {
        if(!dbUser) {
            res.status(400).json({ message: 'email not found' });
            return;
        }
        const validatePass = dbUser.checkPassword(req.body.password);
        if(!validatePass) {
            res.status(400).json({ message: 'password is incorrect' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUser.id;
            req.session.username = dbUser.username;
            req.session.loggedIn = true;
            res.json({ user: dbUser, message: 'now logged in'});
        })
    })
});
//delete session cookie
router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }else {
        res.status(404).end();
    }
});
// update user
router.put('/:id', auth, (req,res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUser => {
        if(!dbUser[0]) {
            res.status(404).json({ message: 'user not found'});
            return;
        }
        res.json(dbUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
//delete user by id

router.delete('/:id', auth, (req, res) => {
    User.destroy({
        where: {
            id:req.params.id
        }
    })
    .then(dbcomment => {
        if(!dbcomment) {
            res.status(404).json({ message: 'id not found' });
            return;
        }
        res.json(dbcomment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }) 
});

module.exports = router;