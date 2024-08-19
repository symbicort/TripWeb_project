"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPW = hashPW;
exports.comparePW = comparePW;
const bcrypt_1 = require("bcrypt");
function hashPW(password) {
    const saltRounds = Number(process.env.PASSWORD_SALT);
    const salt = (0, bcrypt_1.genSaltSync)(saltRounds);
    console.log(salt);
    return (0, bcrypt_1.hashSync)(password, salt);
}
function comparePW(password, hashedPW) {
    return (0, bcrypt_1.compareSync)(password, hashedPW);
}
//# sourceMappingURL=crypto.js.map