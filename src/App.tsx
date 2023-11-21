import type { Router as RemixRouter } from '@remix-run/router';
import { useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { collaboratorScreens } from './modules/collaborator/routes';
import { dashboardScreens } from './modules/dashboard/routes';
import { entryScreens } from './modules/entry/routes';
import { equipmentScreens } from './modules/equipment/routes';
import { exiteScreens } from './modules/exite/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loanScreens } from './modules/loan/routes';
import { loginRoutes } from './modules/login/routes';
import { userScreens } from './modules/user/routes';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useNotification } from './shared/hooks/useNotification';
import { useRequests } from './shared/hooks/useRequests';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...collaboratorScreens,
  ...equipmentScreens,
  ...dashboardScreens,
  ...entryScreens,
  ...exiteScreens,
  ...userScreens,
  ...loanScreens,
  ...firstScreenRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, []);
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
