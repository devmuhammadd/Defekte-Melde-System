// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useAuth } from 'src/hooks/useAuth'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) return VerticalNavGroup

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props
  const { user } = useAuth();
  console.log('user', user);

  const filteredNavItems = verticalNavItems?.filter(item => user?.role !== 'Member' && (item.authority === 'everyone' || item.authority === user?.role));
  const RenderMenuItems = filteredNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item)

    return <TagName {...props} key={index} item={item} />
  })
  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
