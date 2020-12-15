import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import pendingLocationsService from '../services/pendingLocations';

const PendingLocations = ({ pendingLocations, setValidation, rejectPendingLocation }) => {
  const styles = {
    paper: {
      padding: '1rem 5rem 1rem 5rem',
    },
    card: {
      padding: '1rem',
      marginBottom: '1rem',
    },
    h1: {
      color: '#4f4f4f',
    },
    info: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gridTemplateRows: '1fr',
      alignItems: 'center',
    },
    itemTop: {
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid lightgrey',
    },
    button: {
      marginRight: '.5rem',
    },
  };

  const validate = async (location) => {
    const validatedLocation = {
      ...location,
      validated: true,
      rating: 0,
      ratings: 0,
    };

    const deleteFromPendingLocations = await pendingLocationsService.deleteLocation(location);

    if (deleteFromPendingLocations) {
      const updatedLocation = await pendingLocationsService.updateLocation(validatedLocation);
      setValidation(updatedLocation);
    }
  };

  const reject = async (location) => {
    const rejectedLocation = await pendingLocationsService.deleteLocation(location);
    rejectPendingLocation(rejectedLocation);
  };

  return pendingLocations.length ? (
    <Grid>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={styles.h1}>Hyväksyttävät</h2>
        {pendingLocations.map((location) => (
          <Card key={location.id} style={styles.card} elevation={3}>
            <div style={styles.itemTop}>
              <div style={styles.info}>
                <div style={{ justifySelf: 'flex-start' }}>Nimi: </div>
                <div style={{ gridColumn: '3 / span 4' }}>{location.name}</div>
              </div>
              <div style={styles.info}>
                <div style={{ justifySelf: 'flex-start' }}>Tyyppi: </div>
                <div style={{ gridColumn: '3 / span 4' }}>{location.type}</div>
              </div>
              <div style={styles.info}>
                <div style={{ justifySelf: 'flex-start' }}>Palvelut: </div>
                {location.services.length
                  ? location.services.map((service) => (
                      <div
                        key={service}
                        style={{
                          gridColumn: location.services.length === 1 ? '3 / span 4' : null,
                        }}
                      >
                        {service}
                      </div>
                    ))
                  : null}
              </div>
              <div style={styles.info}>
                <div style={{ justifySelf: 'flex-start' }}>Maksullisuus: </div>
                <div style={{ gridColumn: '3 / span 4' }}>{location.payable}</div>
              </div>
              <div style={{ ...styles.info, marginTop: '.5rem' }}>
                <div style={{ justifySelf: 'flex-start' }}>Sijainti: </div>
                <div style={{ gridColumn: '3 / span 4' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    target="_blank"
                    href={`https://www.google.com/maps/?q=${location.lat},${location.lng}`}
                  >
                    Tarkista
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={styles.button}
                variant="outlined"
                color="primary"
                onClick={() => validate(location)}
              >
                Hyväksy
              </Button>
              <Button
                style={styles.button}
                variant="outlined"
                color="primary"
                onClick={() => reject(location)}
              >
                Hylkää
              </Button>
              <Button style={styles.button} variant="outlined" color="primary">
                Muokkaa
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Grid>
  ) : (
    <Grid>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={styles.h1}>Hyväksyttävät</h2>
        <Card style={styles.card}>
          <div style={styles.h1}>Ei hyväksyttäviä kohteita</div>
        </Card>
      </div>
    </Grid>
  );
};

export default PendingLocations;
