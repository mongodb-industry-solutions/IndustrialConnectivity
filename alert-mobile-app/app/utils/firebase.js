import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


export const getAndSetFCMToken = async () => {
    await requestUserPermission()
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('fcmToken: ', fcmToken);
    if (fcmToken == null) {
        fcmToken = await messaging().getToken();
    }
    await AsyncStorage.setItem('fcmToken', fcmToken)
    return fcmToken;
}

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}
const showNotification = (remoteMessage) => {
    console.log('remoteMessage: ', remoteMessage);
    return;
}

export const firebaseMessageHandler = async (userEmail) => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        if (userEmail != null) {
            showNotification(remoteMessage);
        }
    });

    messaging().onMessage(async remoteMessage => {
        if (userEmail != null) {
            showNotification(remoteMessage);
        }
    });

    messaging().getInitialNotification()
        .then((notificationOpen) => {
            if (notificationOpen) {
                const data = notificationOpen.notification._data;
                if (data) {
                    console.log('data: ', data);
                }
            }
        });
}