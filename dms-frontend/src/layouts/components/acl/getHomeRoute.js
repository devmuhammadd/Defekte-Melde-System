/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role, organization) => {
  if (role === 'member' || !organization) return '/onboarding';
  return '/dms'
}

export default getHomeRoute
