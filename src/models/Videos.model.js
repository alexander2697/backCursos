module.exports = (sequelize, Sequelize) => {
    const x = sequelize.define("videos", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
        },
        duration: {
            type: Sequelize.INTEGER
        },
        course: {
            type: Sequelize.TEXT
        },
        path: {
            type: Sequelize.TEXT
        }
    }, {freezeTableName: true});
    return x;
};