"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var date_fns_1 = require("date-fns");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var tsyringe_1 = require("tsyringe");
var CreateAppointmentService = /** @class */ (function () {
    function CreateAppointmentService(appointmentsRepository, notificationsRepository, cacheProvider) {
        this.appointmentsRepository = appointmentsRepository;
        this.notificationsRepository = notificationsRepository;
        this.cacheProvider = cacheProvider;
    }
    CreateAppointmentService.prototype.execute = function (_a) {
        var provider_id = _a.provider_id, user_id = _a.user_id, date = _a.date;
        return __awaiter(this, void 0, void 0, function () {
            var appointmentDate, findAppointmentInSameDate, appointment, dateFormated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        appointmentDate = date_fns_1.startOfHour(date);
                        if (date_fns_1.isBefore(appointmentDate, Date.now())) {
                            throw new AppError_1.default("You can't create an appointment on a past date.");
                        }
                        if (user_id === provider_id) {
                            throw new AppError_1.default("You can't create an appointment with yourself.");
                        }
                        if (date_fns_1.getHours(appointmentDate) < 8 || date_fns_1.getHours(appointmentDate) > 17) {
                            throw new AppError_1.default('You can only create appointments between 8am and 5pm');
                        }
                        return [4 /*yield*/, this.appointmentsRepository.findByDate(appointmentDate, provider_id)];
                    case 1:
                        findAppointmentInSameDate = _b.sent();
                        if (findAppointmentInSameDate) {
                            throw new AppError_1.default('This appointment is already booked');
                            // return response.status(400).json({message: "This appointment is already booked"});
                        }
                        return [4 /*yield*/, this.appointmentsRepository.create({
                                provider_id: provider_id,
                                user_id: user_id,
                                date: appointmentDate,
                            })];
                    case 2:
                        appointment = _b.sent();
                        dateFormated = date_fns_1.format(appointmentDate, "dd/MM/yyyy 'às' HH:mm 'horas'");
                        return [4 /*yield*/, this.notificationsRepository.create({
                                recipient_id: provider_id,
                                content: "Novo agendamento para o dia " + dateFormated,
                            })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.cacheProvider.invalidade("provider-appointments:" + provider_id + ":" + date_fns_1.format(appointmentDate, 'yyyy-M-d'))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, appointment];
                }
            });
        });
    };
    CreateAppointmentService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject('AppointmentsRepository')),
        __param(1, tsyringe_1.inject('NotificationsRepository')),
        __param(2, tsyringe_1.inject('CacheProvider')),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], CreateAppointmentService);
    return CreateAppointmentService;
}());
exports.default = CreateAppointmentService;
