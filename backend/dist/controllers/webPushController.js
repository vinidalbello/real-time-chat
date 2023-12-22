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
Object.defineProperty(exports, "__esModule", { value: true });
const webpush_service_1 = require("../services/webpush.service");
const webpush_service_2 = require("../services/webpush.service");
class WebPushController {
    static getHelloWorld(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(201).json('Hello World!');
        });
    }
    static getSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = req.body;
            const id = Date.now().toString();
            webpush_service_1.subscriptions.set(id, subscription);
            res.status(201).json({ id });
        });
    }
    static sendVapidPublicKey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(webpush_service_2.vapidKeys.publicKey);
        });
    }
}
exports.default = WebPushController;
