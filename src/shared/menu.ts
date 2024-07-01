import {MenuLink} from "./interfaces/menu.interface";

export const menuLinks: MenuLink[] = [
  {
    url: '/dashboard',
    text: 'Dashboard',
    roles: ['*'],
  },
  {
    url: '/users',
    text: 'Users',
    roles: ['ROLE_SYSTEM_ADMIN'],
  },
  {
    url: '/orders',
    text: 'Orders',
    roles: ["ROLE_CLIENT", "ROLE_WAREHOUSE_MANAGER"],
  },
  {
    url: '/deliveries',
    text: 'Deliveries',
    roles: ["ROLE_WAREHOUSE_MANAGER"],
  },
  {
    url: '/items',
    text: 'Items',
    roles: ['ROLE_WAREHOUSE_MANAGER'],
  },
  {
    url: '/trucks',
    text: 'menu.sources',
    roles: ['ROLE_ADMIN', 'ROLE_DIRECTOR', 'ROLE_SALES', 'ROLE_SEARCHER'],
    subLinks: [
      {
        url: '/websites',
        text: 'menu.sources-websites',
        roles: ['ROLE_ADMIN', 'ROLE_DIRECTOR', 'ROLE_SALES', 'ROLE_SEARCHER']
      }
    ]
  },
];
