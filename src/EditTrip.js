import * as React from 'react';
import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
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
import Stack from '@mui/material/Stack';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const API_URL = "http://localhost:3000"

const initialState = {
    isLoading: true,
    error: null,
    trip: null,
    formData: {
        title: '',
        description: '',
        image: '',
        liked: ''
    },
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                trip: action.payload,
                formData: {
                    title: action.payload.title,
                    description: action.payload.description,
                    image: action.payload.image,
                    liked: action.payload.liked
                }
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'UPDATE_FORM_DATA':
            return {
                ...state,
                formData: {
                    ...action.payload
                }
            };
        case 'RESET_FORM_DATA':
            return {
                ...state,
                formData: {
                    title: state.trip.title,
                    description: state.trip.description,
                    image: state.trip.image,
                    liked: state.trip.liked
                }
            };
        default:
            throw new Error('Unknown action type');
    }
}

// -------------
//   COMPONENT 
// -------------
export default function EditTrip() {

    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState)
    const { trip, formData, status } = state
    const { id } = useParams()

    useEffect(() => {
        fetch(`${API_URL}/trips/${id}`)
            .then(r => r.json())
            .then(data => {
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            })
            .catch((error) => {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });
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
            .catch((error) => {
                alert(error)
            })
    }

    function handleDiscard(event) {
        event.preventDefault();
        dispatch({ type: "RESET_FORM_DATA" })
    }

    function handleInputChange(event) {
        // const key = event.target.id
        const { name, value } = event.target

        dispatch({
            type: "UPDATE_FORM_DATA",
            payload: {
                ...formData,
                [name]: value
            }
        })
    }

    // -----------
    //     JSX 
    // -----------

    if (state.isLoading) {
        return <div>Loading...</div>
    }

    if (state.error) {
        return <div>Error: {state.error}</div>
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
                        Update Trip
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} onReset={handleDiscard} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    // id="title"
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
                                    // id="description"
                                    autoComplete="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    // id="image"
                                    label="Image URL"
                                    name="image"
                                    autoComplete="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
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
                                Reset Changes
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
