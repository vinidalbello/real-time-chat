"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.subscriptions = exports.vapidKeys = void 0;
const web_push_1 = __importDefault(require("web-push"));
exports.vapidKeys = {
    publicKey: 'BDBi_8Rsgo1pBlhHayFoxKT1L3L_E8kyRSiaFVh3mjF0vdzLGaXp1B95-ns6qG5B_BC_IIj1Qdl1jaP0Z_t-9bg',
    privateKey: '0MfAj-n2qP7c6NW3sj42OzHTmnBZAcDXIFGwNsdXe-U'
};
web_push_1.default.setVapidDetails('mailto:vinicius@victoware.com', exports.vapidKeys.publicKey, exports.vapidKeys.privateKey);
exports.subscriptions = new Map();
function sendNotification(subscription, data) {
    web_push_1.default.sendNotification(subscription, JSON.stringify(data))
        .catch(error => console.error(error));
}
exports.sendNotification = sendNotification;
