const router = require('express').Router();

const apiRoutes = require('./api');
const loginRoutes = require('./loginRoute.js');
const mainRoutes = require('./mainRoute.js');

router.use('/api', apiRoutes);
router.use('/', loginRoutes);
router.use('/main', mainRoutes);

router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;