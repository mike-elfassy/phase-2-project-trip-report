import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Material UI Components
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const API_URL = "http://localhost:3000"

export default function NewTrip() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "https://mike-elfassy.s3.amazonaws.com/flatiron-school/phase-2/phase-2-project-trip-report/src/assets/trip-default.jpg",
    liked: false
  })

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch(API_URL + "/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(r => r.json())
      .then(data => {
        navigate(`/trips/${data.id}`)
      })
  }

  function handleInputChange(event) {
    const key = event.target.id
    // const value = event.target.type === "checkbox" ? event.target.checked : event.target.value

    setFormData({
      ...formData,
      [key]: event.target.value
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ margin: "8px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Trips
          </Link>
          <Typography color="text.primary">New Trip</Typography>
        </Breadcrumbs>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            New Trip
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Trip Title"
                  name="title"
                  autoComplete="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Description"
                  type="description"
                  id="description"
                  autoComplete="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="image"
                  label="Image URL"
                  name="image"
                  autoComplete="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Trip
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
