const base = {
    url: process.env.DATABASE_URL || 'postgresql://postgres:12345@127.0.0.1/eventfeedback_dev',
    operatorsAliases: false
};

module.exports = {
    development: base,
    production: base,
    base
};
