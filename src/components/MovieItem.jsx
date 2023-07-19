import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MovieItem({ item }) {
  const { deleteMovie } = useMovieContext();
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className="card" sx={{ maxWidth: 345, position: "relative" }}>
      <CardActionArea>
        <CardMedia component="img" height="155" image={item.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description.slice(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", alignItems: "flex-end" }}>
        <Rating name="read-only" value={item.rating} readOnly />
        {/* <Button sx={{ ml: 5 }} onClick={() => navigate(`/edit/${item.id}`)}>
          <EditIcon />
        </Button>
        <Button onClick={() => deleteMovie(item.id)}>
          <DeleteIcon />
        </Button> */}
        <IconButton
          onClick={handleClick}
          aria-label="settings"
          sx={{ position: "absolute", top: 5, right: 5, color: "white" }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            component={Button}
            sx={{ textTransform: "capitalize", color: "red" }}
            onClick={() => deleteMovie(item.id)}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => navigate(`/edit/${item.id}`)}
            component={Button}
            sx={{ textTransform: "capitalize", width: "100%" }}
          >
            Edit
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
}
