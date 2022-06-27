const router = require('express').Router();

const postRoutes = require('./post');
const commentRoutes = require('./comment');
const userRoutes = require('./user')
// localhots:3001/api/post
router.use('/post', postRoutes);
// localhots:3001/api/comment
router.use('/comment', commentRoutes);
// localhots:3001/api/user
router.use('/user', userRoutes);

router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;