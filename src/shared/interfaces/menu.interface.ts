export interface MenuLink {
  url: string,
  text: string,
  roles: Array<string>,
  icon?: string,
  subLinks?: MenuLink[]
}
