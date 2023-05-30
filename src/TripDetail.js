import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink } from "react-router-dom";
import TripDetailCard from './TripDetailCard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const API_URL = "http://localhost:3000"

export default function TripDetail() {

    const [trip, setTrip] = useState({});
    const { id } = useParams()

    useEffect(() => {
        fetch(API_URL + `/trips/${id}`)
            .then(r => r.json())
            .then(data => setTrip(data))
    }, [])

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
                    <Typography color="text.primary">{trip.title}</Typography>
                </Breadcrumbs>
            </Box>
            <Container maxWidth="sm" sx={{ padding: "16px" }}>
                <Box sx={{}}>
                    <TripDetailCard></TripDetailCard>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
