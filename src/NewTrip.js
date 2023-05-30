import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink, useNavigate } from "react-router-dom";

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
  
  function handleChange(event) {
    const key = event.target.id
    // const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    
    setFormData({ 
      ...formData, 
      [key]: event.target.value
    })
  }

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
