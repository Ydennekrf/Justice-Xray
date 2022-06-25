const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute.js');
const dashRoutes = require('./dashRoutes.js');

// router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dash', dashRoutes);

router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;