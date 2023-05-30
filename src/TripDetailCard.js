import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom"
// Material UI Components
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const API_URL = "http://localhost:3000"

export default function TripDetailCard() {

  const { id } = useParams()
  const [trip, setTrip] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    fetch(API_URL + `/trips/${id}`)
      .then(r => r.json())
      .then(data => setTrip(data))
  }, [])

  function handleLikeClick() {
    fetch(API_URL + "/trips/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ liked: !trip.liked })
    })
      .then(r => r.json())
      .then(data => setTrip(data))
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  function handleDelete() {
    fetch(`${API_URL}/trips/${id}`, {
      method: "DELETE",
    })
      .then(navigate('/'))
  }


  return (
    <Card sx={{}} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {/* Avatar Image or Text */}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleSettingsClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={trip.title}
        subheader={trip.date}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSettingsClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => { navigate('./edit') }}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <CardMedia
        component="img"
        height="194"
        image={trip.image}
        alt=""
        sx={{ height: "100%" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {trip.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLikeClick}
          color={trip.liked ? "primary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" disabled>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
