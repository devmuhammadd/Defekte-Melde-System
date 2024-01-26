/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role, organization) => {
  if (role === 'Member' || !organization) return '/onboarding';
  return '/tickets'
}

export default getHomeRoute
