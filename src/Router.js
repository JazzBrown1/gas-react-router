/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useState } from 'react';
import RouterContext from './routerContext';

/* global google */

export default ({ children, loadScreen }) => {
  const [currentPageParams, setCurrentPageParams] = useState({ page: '', params: {}, ready: false });

  useEffect(() => {
    try {
      google.script.url.getLocation((location) => {
        setCurrentPageParams({ page: location.hash, params: location.parameter, ready: true });
      });
    } catch (err) {
      console.error(err);
    }
  }, [setCurrentPageParams]);

  const updatePage = (page, parameters = {}, replace = false) => {
    const params = { ...parameters };
    const now = new Date();
    const state = {
      timestamp: now.getTime()
    };
    if (replace) google.script.history.replace(state, params, page);
    else google.script.history.push(state, params, page);
    setCurrentPageParams({ page, params, ready: true });
  };

  const updateParams = (parameters = {}, replace = false) => {
    const params = { ...parameters };
    const now = new Date();
    const state = {
      timestamp: now.getTime()
    };
    if (replace) google.script.history.replace(state, params, currentPageParams.page);
    else google.script.history.push(state, params, currentPageParams.page);
    setCurrentPageParams({ page: currentPageParams.page, params, ready: true });
  };

  useEffect(() => {
    try {
      google.script.history.setChangeHandler((e) => {
        setCurrentPageParams({ page: e.location.hash, params: e.location.parameter, ready: true });
      });
    } catch (err) {
      console.error(err);
    }
  }, [setCurrentPageParams]);

  if (currentPageParams.ready) {
    return (
      <RouterContext.Provider value={{
        routeParams: currentPageParams.params,
        page: currentPageParams.page,
        updatePage,
        updateParams
      }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
  return loadScreen || (<div>Loading...</div>);
};
