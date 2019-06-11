const url = process.env.DATABASE_URL || 'postgresql://postgres:12345@127.0.0.1/eventfeedback_dev';

const base = {
    url: url,
    operatorsAliases: false,
    dialect: 'postgres',
    // ssl: url.indexOf('?ssl=true') >= 0,
    // dialectOptions: {
    //     ssl: {
    //         require: url.indexOf('?ssl=true') >= 0
    //     }
    // }
};

module.exports = {
    development: base,
    production: base,
    base
};
