const router = require('express').Router();
const {User} = require('../../models');
const auth = require('../../utils/authenticate');

router.get('/', (req,res) => {
    Comment.findAll({})
    .then(dbcomment => res.json(dbcomment))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
// creat new comment and add to db
router.post('/', auth, (req,res) => {
    if (req.session) {
        Comment.create({
            comment_txt: req.body.comment_txt,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbcomment => res.json(dbcomment))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});
//delete comment by id

router.delete('/:id', auth, (req, res) => {
    Comment.destroy({
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