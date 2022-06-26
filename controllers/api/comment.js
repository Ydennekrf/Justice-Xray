const router = require('express').Router();
const {Comment} = require('../../models');
const auth = require('../../utils/authenticate');

router.get('/', (req,res) => {
    Comment.findAll({})
    .then(dbcomment => res.json(dbcomment))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', auth, (req,res) => {
    
})