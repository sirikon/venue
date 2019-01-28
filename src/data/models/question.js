'use strict';
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        question: DataTypes.TEXT,
        ip: DataTypes.STRING,
        userId: DataTypes.STRING,
        talkSlug: DataTypes.STRING,
        date: DataTypes.DATE
    }, {});
    Question.associate = function() {
    // associations can be defined here
    };
    return Question;
};