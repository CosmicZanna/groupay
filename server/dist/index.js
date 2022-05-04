"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./src/router"));
const app = (0, express_1.default)();
const auth_1 = __importDefault(require("./src/middleware/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./src/config");
app.use((0, cors_1.default)());
app.use(auth_1.default.decodeToken);
app.use(express_1.default.json());
app.use(router_1.default);
const PORT = config_1.development.port;
(function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb://${config_1.development.domain}/${config_1.development.database}`);
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => console.log(`running on port ${PORT}`));
    });
})();
mongoose_1.default.connection.once('open', function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(config_1.development);
        if (config_1.development.database === 'groupay_test') {
            yield mongoose_1.default.connection.collections.users.drop();
            yield mongoose_1.default.connection.collections.groups.drop();
        }
    });
}).on('error', function (error) {
    console.log('TestDB connection error', error);
});
exports.default = app;
