import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../../_context/UserContext';

export const Menu = () => {
  const { user } = useUserContext();
  if (!user) {
    return <Redirect to="/account" />
  }
  return (<>
    Menu
  </>);
}
