import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Navigation = () => {
  const styles = {
    container: {
      width: '100%',
      heigth: '20vh',
      backgroundColor: '#85cad4',
      padding: '1rem',
      fontSize: '1rem',
      color: '#fff',
    },
    login: {
      // backgroundColor: '#fff',
    },
  };

  return (
    <Grid container>
        <Paper className="navigation-container" style={styles.container}>
          <h1>Lähin vessa</h1>
        </Paper>
        {/* <Paper>Kirjautuminen</Paper> */}
    </Grid>
  );
};

export default Navigation;
