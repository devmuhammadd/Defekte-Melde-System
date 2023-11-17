export default {
  meEndpoint: '/me',
  loginEndpoint: '/token',
  registerEndpoint: '/users',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
