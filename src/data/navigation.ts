import { links } from './site'

export interface NavLink {
  label: string
  href: string
}

export const headerNav: NavLink[] = [
  { label: 'Arkham City', href: links.city.repo },
  { label: 'Arkham Knight', href: links.knight.repo },
  { label: 'Docs', href: links.docs.home },
]

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Games',
    links: [
      { label: 'Arkham City', href: links.city.repo },
      { label: 'Arkham Knight', href: links.knight.repo },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Documentation', href: links.docs.home },
      { label: 'Your first mod', href: links.docs.firstMod },
      { label: 'Building BmSDK', href: links.docs.building },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Releases', href: links.city.releases },
      { label: 'GitHub', href: links.city.repo },
      { label: 'License', href: links.city.license },
    ],
  },
]
