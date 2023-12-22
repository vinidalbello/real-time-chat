"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webPushController_1 = __importDefault(require("../controllers/webPushController"));
const router = express_1.default.Router();
router.get('/', webPushController_1.default.getHelloWorld);
router.post('/subscribe', express_1.default.json(), webPushController_1.default.getSubscription);
router.get('/vapidPublicKey', webPushController_1.default.sendVapidPublicKey);
exports.default = router;
