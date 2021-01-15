// eslint-disable-next-line import/no-unresolved
import { useContext } from 'react';

import RouterContext from './routerContext';

const useRouter = () => {
  const {
    page, routeParams, updateParams, updatePage
  } = useContext(RouterContext);
  return {
    page,
    params: routeParams,
    updateParams, // deprecate
    updatePage, // deprecate
    setParams: updateParams,
    setPage: updatePage
  };
};

export default useRouter;
