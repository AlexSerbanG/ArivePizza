import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { PizzaSize, Product, Topping } from "../_context/types";
import { pizaSizePriceMap } from "../_mockData/pizzas";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    avatar: {
      backgroundColor: red[500],
    },
    media: {
      padding: "0.5rem",
    },
  })
);

type PizzaCardProps = {
  name: string;
  imgSrc: string;
  toppings: Topping[];
  addToCart: (product: Product) => void;
};

type CheckedToppingMap = {
  [key: number]: boolean;
};

export const PizzaCard: React.FC<PizzaCardProps> = ({
  name,
  imgSrc,
  toppings,
  addToCart,
}) => {
  const classes = useStyles();
  const [size, setSize] = React.useState<number>(-1);
  const [checkedToppings, setCheckedToppings] =
    React.useState<CheckedToppingMap>({});

  const totalValue: number = React.useMemo(() => {
    if (size === -1) {
      return 0;
    }
    const toppingsSum = toppings.reduce((prev, curr) => {
      if (checkedToppings[curr.type]) {
        return prev + curr.price;
      }
      return prev;
    }, 0);
    return toppingsSum + pizaSizePriceMap[size];
  }, [size, checkedToppings, toppings]);

  const resetSelection = () => {
    setSize(-1);
    setCheckedToppings(toppings.reduce((prev, curr) => ({ ...prev, [curr.type]: false }), {}));
  };

  return (
    <Card className={classes.root}>
      <CardHeader title={name} />
      <CardMedia component="img" src={imgSrc} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive description of a pizza that would normally come from
          the backend but let's enjoy the mouth-watering photo instead!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container>
          <Grid item container direction="column" xl={6} lg={6} md={6}>
            <Grid item>
              <FormLabel component="legend">Size</FormLabel>
            </Grid>
            <Grid item>
              <RadioGroup
                aria-label="size"
                name="size"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              >
                <FormControlLabel
                  value={PizzaSize.small}
                  control={<Radio />}
                  label="Small ($15)"
                />
                <FormControlLabel
                  value={PizzaSize.medium}
                  control={<Radio />}
                  label="Medium ($20)"
                />
                <FormControlLabel
                  value={PizzaSize.large}
                  control={<Radio />}
                  label="Large ($25)"
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid item container direction="column" xl={6} lg={6} md={6}>
            <Grid item>
              <FormLabel component="legend">Toppings</FormLabel>
            </Grid>
            <Grid item>
              <FormGroup>
                {toppings?.map((topping, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        onChange={(e) =>
                          setCheckedToppings((prevVal) => ({
                            ...prevVal,
                            [topping.type]: e.target.checked,
                          }))
                        }
                        name={topping.name}
                        checked={Boolean(checkedToppings[topping.type])}
                      />
                    }
                    label={`${topping.name} ($${topping.price})`}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={size === -1}
              onClick={() => {
                addToCart({
                  name,
                  size,
                  toppings: toppings.filter(
                    (topping) => checkedToppings[topping.type]
                  ),
                });
                resetSelection();
              }}
            >
              Add to cart (${totalValue})
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};
