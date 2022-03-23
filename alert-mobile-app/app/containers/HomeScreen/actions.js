/*
 *
 * HomeScreen actions
 *
 */

export function actionLoginUser(user) {
  return {
    type: 'LOGIN_USER',
    user
  }
}

export function setRealmConnection(realmConnection) {
  return {
    type: 'REALM_CONNECTION',
    realmConnection
  }
}

export function setRealmUserId(realmUserId) {
  return {
    type: 'REALM_USER_ID',
    realmUserId
  }
}

export function setRealmUserEmail(realmUserEmail) {
  return {
    type: 'REALM_USER_EMIAL',
    realmUserEmail
  }
}