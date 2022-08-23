"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCode = void 0;
class generateRandomCode {
    constructor() {
        gen;
        {
            let code = "";
            for (let i = 0; i < 6; i++) {
                code += Math.floor(Math.random());
            }
            console.log(code);
            return code;
        }
    }
}
exports.generateRandomCode = generateRandomCode;
//# sourceMappingURL=generateRandomCode.js.map