import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useCartContext } from "../../_context/CartContext";
import { pizaSizePriceMap, pizzaSizeNameMap } from "../../_mockData/pizzas";
import {
  Button,
  List,
  ListItem,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { useUserContext } from "../../_context/UserContext";
import { cities } from "../../_mockData";
import { useFormik } from "formik";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  row: {
    "&>div": {
      margin: "1.5rem",
      padding: "1rem",
    },
  },
  container: {
    border: `2px solid ${theme.palette.primary}`
  }
}));

export const Cart = () => {
  const { products } = useCartContext();
  const { user, isValid: isValidUser } = useUserContext();
  const history = useHistory();
  const classes = useStyles();
  const {
    meta,
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();
  const formik = useFormik<any>({
    initialValues: {},
    onSubmit: (values: any) => {
      console.log(
        "Here are your card details that we sent for validation:",
        values
      );
      history.push('/order-success');
    },
    validateOnBlur: true,
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    isValid,
    dirty,
  } = formik;
  const totalSum = React.useMemo(() => {
    return products.reduce((prev, { size, toppings }) => {
      return (
        prev +
        pizaSizePriceMap[size] +
        toppings.reduce((subtotal, topping) => subtotal + topping.price, 0)
      );
    }, 0);
  }, [products]);

  if (!isValidUser) {
    return <Redirect to="/account" />;
  }

  return (
    <Grid container justifyContent="space-around">
      <Grid item container justifyContent="center">
        <Typography variant="h3">Finalise order</Typography>
      </Grid>
      <Grid item className={classes.row}>
        <Paper>
          {products.length === 0 && (
            <Typography variant="h5">Your cart is empty</Typography>
          )}
          <List>
            {products.map((product, index) => (
              <ListItem key={index}>
                <Typography variant="body1">
                  {`1 ${pizzaSizeNameMap[product.size]} ${product.name} with ${
                    product.toppings?.map((p) => p.name).join(", ") ||
                    "no extra toppings"
                  }`}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: ${totalSum}</Typography>
        </Paper>
      </Grid>
      <Grid item className={classes.row}>
        <Paper>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="h6">
            {cities.find((c) => user.address.cityId === c.id)?.name}
          </Typography>
          <Typography variant="body1">
            {user.address.streetName} {user.address.houseNumber}{" "}
            {user.address.postalCode}{" "}
          </Typography>
        </Paper>
      </Grid>
      <Grid item className={classes.row}>
        <Paper>
          <form onSubmit={handleSubmit}>
            <PaymentInputsWrapper {...wrapperProps}>
              <svg {...getCardImageProps({ images })} />
              <TextField
                name="cardNumber"
                inputProps={{
                  ...getCardNumberProps({
                    onBlur: handleBlur,
                    onChange: handleChange,
                  }),
                }}
              />
              <TextField
                name="expiryDate"
                inputProps={{
                  ...getExpiryDateProps({
                    onBlur: handleBlur,
                    onChange: handleChange,
                  }),
                }}
              />
              <TextField
                name="cvc"
                inputProps={getCVCProps({
                  onBlur: handleBlur,
                  onChange: handleChange,
                })}
              />
            </PaymentInputsWrapper>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="small"
              disabled={
                !isValid || isSubmitting || !dirty || Boolean(meta.error)
              }
            >
              Pay order
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
