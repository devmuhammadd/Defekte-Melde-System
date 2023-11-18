export default {
  meEndpoint: '/profile',
  loginEndpoint: '/token',
  registerEndpoint: '/users',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
