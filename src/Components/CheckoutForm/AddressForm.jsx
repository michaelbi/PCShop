import React, { useState, useEffect } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import FormInput from "./FormInput";
import SelectInput from "./SelectInput";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    var { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    countries = Object.entries(countries).map(([code, name]) => ({
      id: code,
      name: name,
    }));
    setShippingCountries(countries);
    setShippingCountry(countries[0].id);
  };

  const fetchSubdivisions = async (countryCode) => {
    var { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    subdivisions = Object.entries(subdivisions).map(([code, name]) => ({
      id: code,
      name: name,
    }));
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(subdivisions && subdivisions[0].id);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    var options = await commerce.checkout.getShippingOptions(checkoutTokenId, {
      country,
      region: stateProvince,
    });

    options = options.map((sO) => ({
      id: sO.id,
      name: `${sO.description} - (${sO.price.formatted_with_symbol})`,
    }));

    setShippingOptions(options);
    setShippingOption(options && options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken.id]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision, checkoutToken.id, shippingCountry]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              country: shippingCountry,
              subdivision: shippingSubdivision,
              option: shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="ZIP / Postal code" />
            <SelectInput
              name="country"
              label="Shipping Contry"
              value={shippingCountry}
              change={(e) => setShippingCountry(e.target.value)}
              selections={shippingCountries}
            />
            <SelectInput
              name="subdivision"
              label="Shipping Subdivision"
              value={shippingSubdivision}
              change={(e) => setShippingSubdivision(e.target.value)}
              selections={shippingSubdivisions}
            />
            <SelectInput
              name="option"
              label="Shipping Options"
              value={shippingOption}
              change={(e) => setShippingOption(e.target.value)}
              selections={shippingOptions}
            />
          </Grid>

          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
