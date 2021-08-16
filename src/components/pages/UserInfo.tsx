import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { UserInfo } from "../../_context/types";
import { useCities } from "../../hooks/useCities";
import { useUserContext } from "../../_context/UserContext";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.object({
    cityId: Yup.number()
      .required("City is required")
      .integer("Invalid value")
      .positive("Invalid value"),
    postalCode: Yup.string().required("Postal code is required"),
    streetName: Yup.string().required("Street name is required"),
    houseNumber: Yup.string().required("House number is required"),
  }),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/),
});

export const Account = () => {
  const { cities } = useCities();
  const { updateUser, user } = useUserContext();
  const history = useHistory();
  const formik = useFormik<UserInfo>({
    initialValues: user,
    validationSchema,
    onSubmit: (values: UserInfo) => {
      updateUser(user).then(() => history.push('/menu'));
    },
    validateOnBlur: true,
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
    isValid,
    values,
    dirty,
  } = formik;

  return (
    <Grid container justifyContent="center">
      <Grid item style={{ marginTop: "5rem" }}>
        <Paper style={{ minWidth: "30rem", padding: "3rem 2rem" }}>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h3" align="center">
                  Contact details
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="streetName"
                  name="address.streetName"
                  label="Street Name"
                  value={values.address?.streetName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.address?.streetName &&
                    Boolean(errors.address?.streetName)
                  }
                  helperText={
                    touched.address?.streetName && errors.address?.streetName
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="houseNumber"
                  name="address.houseNumber"
                  label="House Number"
                  value={values.address?.houseNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.address?.houseNumber &&
                    Boolean(errors.address?.houseNumber)
                  }
                  helperText={
                    touched.address?.houseNumber && errors.address?.houseNumber
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="postalCode"
                  name="address.postalCode"
                  label="Postal Code"
                  value={values.address?.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.address?.postalCode &&
                    Boolean(errors.address?.postalCode)
                  }
                  helperText={
                    touched.address?.postalCode && errors.address?.postalCode
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="city"
                  name="address.cityId"
                  label="City"
                  value={values.address?.cityId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.address?.cityId && Boolean(errors.address?.cityId)
                  }
                  select
                  helperText={touched.address?.cityId && errors.address?.cityId}
                  variant="outlined"
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone number"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="large"
                  disabled={!isValid || isSubmitting || !dirty}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
