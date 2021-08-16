import * as React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useUserContext } from "../../_context/UserContext";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { PizzaCard } from "../PizzaCard";
import { usePizzas } from "../../hooks/usePizzas";
import { useCartContext } from "../../_context/CartContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    appBarContainer: {
      marginBottom: '5rem',
    },
    menuContainer: {
      padding: '2rem 1rem 5rem 3rem',
      '&>div': {
        margin: '1rem 0.5rem'
      }
    }
  })
);

export const Menu = () => {
  const { isValid } = useUserContext();
  const history = useHistory();
  const classes = useStyles();
  const { pizzas, toppings } = usePizzas();
  const { addToCart, products } = useCartContext();
  if (!isValid) {
    return <Redirect to="/account" />;
  }
  return (
    <Grid container direction="column">
      <Grid item className={classes.appBarContainer}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Arrive Pizza
            </Typography>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.push("/cart")}
            >
              <Badge badgeContent={products.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item container className={classes.menuContainer}>
        {pizzas.map((pizza) => (
          <Grid item key={pizza.id}>
            <PizzaCard {...pizza} toppings={toppings} addToCart={addToCart}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
