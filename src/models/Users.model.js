module.exports = (sequelize, Sequelize) => {
    const user = new sequelize.define("Users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {freezeTableName: true});
    return user;
};