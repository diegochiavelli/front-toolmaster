import { RouteObject } from 'react-router-dom';

import Dashboad from './';

export enum DashboardRoutesEnum {
  DASHBOARD = '/dashboard',
}
export const dashboardScreens: RouteObject[] = [
  {
    path: DashboardRoutesEnum.DASHBOARD,
    element: <Dashboad />,
  },
];
