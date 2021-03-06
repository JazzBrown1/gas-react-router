// eslint-disable-next-line import/no-unresolved
import { useContext } from 'react';

import RouterContext from './routerContext';

const usePage = () => {
  const { page } = useContext(RouterContext);
  return page;
};

export default usePage;
