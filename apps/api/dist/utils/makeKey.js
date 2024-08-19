"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomKey = randomKey;
const crypto_1 = require("crypto");
function randomKey() {
    return (0, crypto_1.randomBytes)(25).toString('hex');
}
//# sourceMappingURL=makeKey.js.map