import express from 'express';
import WebPushController from '../controllers/webPushController';
import StripeController from '../controllers/stripeController';
import IndexController from '../controllers/indexController';

const router = express.Router();

router.get('/', IndexController.getHelloWorld);
router.post('/subscribe', express.json(), WebPushController.getSubscription);
router.get('/vapidPublicKey', WebPushController.sendVapidPublicKey);
router.post('/checkout', express.json(), StripeController.createTheRequestForStripe)

export default router;