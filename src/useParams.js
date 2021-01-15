// eslint-disable-next-line import/no-unresolved
import { useContext } from 'react';

import RouterContext from './routerContext';

const useParams = () => {
  const { routeParams, updateParams } = useContext(RouterContext);
  return [routeParams, updateParams];
};

export default useParams;
