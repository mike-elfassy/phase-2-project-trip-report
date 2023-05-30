import * as React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"

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
import Stack from '@mui/material/Stack';
import { CenterFocusStrongOutlined, CenterFocusStrongTwoTone } from '@mui/icons-material';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const API_URL = "http://localhost:3000"

function reducer(state, action) {
    if (action.type === "startFetch") {
        return { trip: null, formData: null, status: "pending" }
    } else if (action.type === "resolvedFetch") {
        return {
            trip: action.payload,
            formData: {
                title: action.payload.title,
                description: action.payload.description,
                image: action.payload.image,
                liked: action.payload.liked
            },
            status: "fetchResolved"
        }
    } else if (action.type === "updateForm") {
        return {
            trip: state.trip,
            formData: {
                title: action.payload.title,
                description: action.payload.description,
                image: action.payload.image,
                liked: action.payload.liked
            },
            status: "fetchResolved"
        }
    } else if (action.type === "discardChanges") {
        return {
            trip: state.trip,
            formData: {
                title: state.trip.title,
                description: state.trip.description,
                image: state.trip.image,
                liked: state.trip.liked
            },
            status: "fetchResolved"
        }
    }
    return state
}


// -------------
//   COMPONENT 
// -------------
export default function EditTrip() {

    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, {
        trip: null,
        form: null,
        status: "idle"
    })
    const { trip, formData, status } = state
    const { id } = useParams()

    useEffect(() => {
        dispatch({ type: "startFetch" })
        fetch(`${API_URL}/trips/${id}`)
            .then(r => r.json())
            .then(data => {
                dispatch({ type: "resolvedFetch", payload: data })
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`${API_URL}/trips/${trip.id}`, {
            method: "PATCH",
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

    function handleDiscard(event) {
        event.preventDefault();
        dispatch({ type: "discardChanges" })
    }

    function handleChange(event) {
        const key = event.target.id

        dispatch({
            type: "updateForm",
            payload: {
                ...formData,
                [key]: event.target.value
            }
        })
    }

    // -----------
    //     JSX 
    // -----------

    if (status !== "fetchResolved") {
        return <p>Loading...</p>;
    }

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
                <Link
                    underline="hover"
                    color="inherit"
                    component={RouterLink}
                    to={`/trips/${id}`}
                >
                    {trip.title}
                </Link>
                <Typography color="text.primary">Edit</Typography>
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
                        Update Trip
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} onReset={handleDiscard} sx={{ mt: 3 }}>
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
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Button
                                type="reset"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Discard Changes
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Trip
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
