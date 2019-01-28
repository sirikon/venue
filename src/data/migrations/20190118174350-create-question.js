'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            question: {
                type: Sequelize.TEXT
            },
            ip: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING
            },
            talkSlug: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Questions');
    }
};