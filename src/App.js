import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Navigation from './components/Navigation';
import PendingLocations from './components/PendingLocations';
import Locations from './components/Locations';
import pendingLocationsService from './services/pendingLocations';
import locationsService from './services/locations';
import Grid from '@material-ui/core/Grid';

import './App.css';

const App = () => {
  const [pendingLocations, setPendingLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      const resPendingLocations = await pendingLocationsService.getAll();
      setPendingLocations(pendingLocations.concat(resPendingLocations));
      const resLocations = await locationsService.getLocations();
      setLocations(locations.concat(resLocations));
    };
    getLocations();
  }, []);

  const setValidation = (location) => {
    console.log(location);
    setPendingLocations(
      pendingLocations.filter((pendingLocation) => pendingLocation.name !== location.name)
    );
    setLocations(locations.concat(location));
  };

  const rejectPendingLocation = async (location) => {
    setPendingLocations(
      pendingLocations.filter((pendingLocation) => pendingLocation.name !== location.name)
    );
  };

  const deleteLocation = async (location) => {
    setLocations(locations.filter((loc) => loc.name !== location.name));
  };

  const handleUser = (userLogginIn) => {
    setUser(userLogginIn);
  };

  return (
    <div className="App">
      <Navigation />
        <Route path="/" exact>
          <Login handleUser={handleUser} />
        </Route>
        <Route path="/admin">
          {user && user.role === 'admin' ? (
            <Grid className="container" container>
              <Grid className="pending" item xs={5}>
                <PendingLocations
                  setValidation={setValidation}
                  pendingLocations={pendingLocations}
                  rejectPendingLocation={rejectPendingLocation}
                />
              </Grid>

              <Grid className="locations" item xs={5}>
                <Locations locations={locations} deleteLocation={deleteLocation} />
              </Grid>
            </Grid>
          ) : null}
        </Route>
    </div>
  );
};

export default App;
