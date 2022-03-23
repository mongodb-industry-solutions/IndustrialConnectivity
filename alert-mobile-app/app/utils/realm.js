import { REALM_APP_ID } from "../config";
import Realm from "realm";
import { SensorData } from "schemas/SensorData";

export const loginUser = async (email, password, _partition, fcmToken) => {
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.function({
        email: email,
        password: password,
        _partition: _partition,
        token: fcmToken
    });
    return await app.logIn(credentials);
}

export const getRealm = async (user, _partition,) => {
    try {
        const realmConfig = {
            sync: {
                user: user,
                partitionValue: _partition,
                error: (err) => console.log(JSON.stringify(err))
            },
            schema: [SensorData]
        };
        return await Realm.open(realmConfig).then((realm) => realm);
    } catch (error) {
        return error;
    }
}
