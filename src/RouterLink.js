/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line import/no-unresolved
import React, { useContext } from 'react';

import RouterContext from './routerContext';

// eslint-disable-next-line react/prop-types
const RouterLink = ({ children, page, params }) => {
  const { updatePage } = useContext(RouterContext);
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  return <div onClick={() => updatePage(page, params)}>{children}</div>;
};

export default RouterLink;
