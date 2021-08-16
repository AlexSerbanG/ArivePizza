import * as React from 'react';
import { getCities } from '../services/cityService';
import { City } from '../_context/types';

export const useCities = () => {
  const [cities, setCities] = React.useState<City[]>([]);
  React.useEffect(() => {
    getCities().then(data => setCities(data))
  },[]);
  return {
    cities,
  };
}
