"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
require('dotenv').config();
const development = {
    port: process.env.PORT || 3001,
    domain: process.env.DOMAIN || 'localhost',
    database: process.env.DB || 'groupay',
};
exports.development = development;
if (process.env.APP_ENV == 'test') {
    development.database = 'groupay_test';
}
