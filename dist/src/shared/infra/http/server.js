"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
require("@shared/infra/typeorm");
require("@shared/container");
var upload_1 = __importDefault(require("@config/upload"));
var routes_1 = __importDefault(require("./routes"));
var rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(rateLimiter_1.default);
app.use(cors_1.default());
app.use('/files', express_1.default.static(upload_1.default.uploadsFolder));
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            statu: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, function () {
    console.log('🥶 server started on port 3333');
});
