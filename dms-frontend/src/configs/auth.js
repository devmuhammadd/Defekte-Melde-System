export default {
  meEndpoint: '/auth/me',
  loginEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/token`,
  registerEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
