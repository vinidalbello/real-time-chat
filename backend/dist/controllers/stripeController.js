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
exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripePrivateKey = 'sk_test_51OKkn8IRW3nLNxiwBpTXXvMFvK54mInI0C9d24yF2c7zq3bmZCkjFD2WyX5oYbeah34XgphoyZidZ0VDlzlyi6Pc003goEVB2H';
exports.stripe = new stripe_1.default(stripePrivateKey, { apiVersion: "2023-10-16", typescript: true });
// Aqui é aonde vai os dados do produto/Banco de dados
const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Item 1 teste" }],
    [2, { priceInCents: 20000, name: "Item 2 teste" }],
]);
class StripeController {
    static createTheRequestForStripe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lineItems = req.body.items.map((item) => {
                    const storeItem = storeItems.get(item.id);
                    if (!storeItem) {
                        throw new Error(`Item with ID ${item.id} not found.`);
                    }
                    return {
                        price_data: {
                            currency: "brl",
                            product_data: {
                                name: storeItem.name,
                            },
                            unit_amount: storeItem.priceInCents,
                        },
                        quantity: item.quantity,
                    };
                });
                const session = yield exports.stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    mode: "payment",
                    line_items: lineItems,
                    success_url: 'http://localhost:5173/checkout/success',
                    cancel_url: 'http://localhost:5173/checkout/reject',
                });
                res.json({ url: session.url });
            }
            catch (e) {
                res.status(500).json({ error: e.message });
            }
        });
    }
}
exports.default = StripeController;
