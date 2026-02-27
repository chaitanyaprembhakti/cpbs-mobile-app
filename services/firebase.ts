import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, onSnapshot } from "firebase/firestore";
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBrOtzYCbFZgS0nb1gCWDyIqI23V7NikgY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cpbs-admin.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cpbs-admin",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cpbs-admin.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "33454825743",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:33454825743:web:aa6a872cf5058b284b9e7a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with multiple tab manager for better compatibility
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export interface InformationData {
    enabled: boolean;
    title: string;
    text: string;
    imageUrl?: string;
    imageUrl2?: string;
    imageUrl3?: string;
}

export const setupPushNotifications = async (onNotificationClick: (data: any) => void) => {
    if (!Capacitor.isNativePlatform()) return;

    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
    }

    await PushNotifications.register();

    // On success, we should be able to receive notifications
    await PushNotifications.addListener('registration', token => {
        console.log('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    await PushNotifications.addListener('registrationError', error => {
        console.error('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push received: ' + JSON.stringify(notification));
    });

    // Method called when tapping on a notification
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        if (notification.notification.data) {
            onNotificationClick(notification.notification.data);
        }
    });
};
