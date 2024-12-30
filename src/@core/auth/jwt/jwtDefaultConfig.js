// ** Auth Endpoints
const URL_API = "http://10.10.21.5:8080/api" //'https://localhost:7283/api/' //'http://192.168.4.20:80' http://10.10.21.5:8080/api
export default {
  loginEndpoint: `${URL_API}/Authentication/Login`,
  //loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
