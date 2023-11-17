export default {
  meEndpoint: '/auth/me',
  loginEndpoint: `/token`,
  registerEndpoint: '/users',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
