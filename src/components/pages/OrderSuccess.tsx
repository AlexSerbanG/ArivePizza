import { Grid } from '@material-ui/core';
import * as React from 'react';
import { useCartContext } from '../../_context/CartContext';

export const OrderSuccess = () => {
  const { products } = useCartContext();
  console.log(products);
  return (<Grid>
    Order was successfull. Pizza is on the way! hold tight!
  </Grid>)
}
