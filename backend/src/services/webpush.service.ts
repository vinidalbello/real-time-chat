import webPush from 'web-push';
import { PushMessageData, PushSubscription } from '../interface/interface';

export const vapidKeys = {
  publicKey: 'BDBi_8Rsgo1pBlhHayFoxKT1L3L_E8kyRSiaFVh3mjF0vdzLGaXp1B95-ns6qG5B_BC_IIj1Qdl1jaP0Z_t-9bg',
  privateKey: '0MfAj-n2qP7c6NW3sj42OzHTmnBZAcDXIFGwNsdXe-U'
};

webPush.setVapidDetails(
  'mailto:vinicius@victoware.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const subscriptions = new Map();

export function sendNotification(subscription: PushSubscription, data: PushMessageData) {
  webPush.sendNotification(subscription, JSON.stringify(data))
    .catch(error => console.error(error));
}
