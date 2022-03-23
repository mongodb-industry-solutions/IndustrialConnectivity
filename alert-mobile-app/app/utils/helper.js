import { Buffer } from 'buffer';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

function getDate(date) {
    return moment.utc(date).format('DD / MM / YY')
}

function getStatus(acknowledged) {
    return acknowledged ? 'Acknowledged' : 'Open';
}

function getType(code) {
    return code == 100 ? 'Movement' : 'Unknown';
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function btoa(input) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }

        block = block << 8 | charCode;
    }

    return output;
}

function getSensorImage(data) {
    let imageBuffer = Buffer.from(data)
    let binary = '';
    let len = imageBuffer.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(imageBuffer[i]);
    }
    return `data:image/png;base64,${btoa(binary)}`
}

const logoutUser = async (navigation) => {
    messaging().deleteToken();
    await AsyncStorage.clear();
    navigation.navigate('Home');
}


export {
    getDate, getSensorImage, getStatus, getType, validateEmail, logoutUser
};
