import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
// Material UI Components
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_URL = "http://localhost:3000"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// -------------
//   COMPONENT 
// -------------
export default function Album() {

  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetch(API_URL + "/trips")
      .then(r => r.json())
      .then(data => setTrips(data))
  }, [])

  // -------------
  //     JSX 
  // -------------
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* Hero Unit: Title, Description, and 'Create' button */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Trip Report
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Share your travel tales and unforgettable experiences by adding diary entries on the Trip Report website. Inspire and be inspired!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" component={RouterLink} to="/trips/new">Create a Trip Report</Button>
            {/* <Button variant="outlined">Secondary action</Button> */}
          </Stack>
        </Container>
      </Box>
      {/* End Hero Unit */}
      {/* Trip Reports */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {trips.map((trip) => (
            <Grid item key={trip.id} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image={trip.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {trip.title}
                  </Typography>
                  <Typography>
                    {trip.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={RouterLink} to={`/trips/${trip.id}`}>View</Button>
                  <Button size="small" component={RouterLink} to={`/trips/${trip.id}/edit`}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
