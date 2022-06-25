
const sequelize = require('../config/connections');
const userSeeding = require('./user');
const postSeeding = require('./post');
const commentSeeding = require('./comment');

const seeds = async () => {
    await sequelize.sync({ force:true });
    console.log('database synced');
    await userSeeding();
    console.log('user seeded');
    await postSeeding();
    console.log('post seeded');
    await commentSeeding();
    console.log('comment seeded');

    process.exit();
};

seeds();