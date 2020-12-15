import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import locationsService from '../services/locations';

const Locations = ({ locations, setValidation, deleteLocation }) => {
  const styles = {
    paper: {
      padding: '1rem 5rem 1rem 5rem',
    },
    card: {
      display: 'grid',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '40% 60%',
      alignItems: 'center',
      padding: '1rem',
      marginBottom: '1rem',
    },
    h1: {
      color: '#4f4f4f',
    },
  };

  const handleDelete = async (location) => {
    const deletedLocation = await locationsService.deleteLocation(location);
    deleteLocation(deletedLocation);
  };

  return (
    <Grid>
      <div>
        <h2 style={styles.h1}>Hyväksytyt</h2>
        {locations.map((location) => (
          <Card key={location.id} style={styles.card} elevation={3}>
            <div style={{ justifySelf: 'flex-start' }}>{location.name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button variant="outlined" color="primary">
                Muokkaa
              </Button>
              <Button variant="outlined" color="primary" onClick={() => handleDelete(location)}>
                Poista
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Grid>
  );
};

export default Locations;
