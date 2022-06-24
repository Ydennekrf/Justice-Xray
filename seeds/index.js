const seedPost = require('./post');
const seedUser = require('./user');
const seedComment = require('./comment');

const sequelize = require('../config/connections');

const seeds = async () => {
    await sequelize.sync({ force:true });
    console.log('database synced');
    await seedUser();
    console.log('user seeded');
    await seedPost();
    console.log('post seeded');
    await seedComment();
    console.log('comment seeded');

    process.exit();
};

seeds();