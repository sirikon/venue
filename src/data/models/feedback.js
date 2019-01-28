'use strict';
module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        talkSlug: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        ip: DataTypes.STRING,
        userId: DataTypes.STRING,
        date: DataTypes.DATE
    }, {});
    Feedback.associate = function() {
    // associations can be defined here
    };
    return Feedback;
};