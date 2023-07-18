import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

export default function MovieItem({ item }) {
  const { deleteMovie } = useMovieContext();
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={item.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", alignItems: "flex-end" }}>
        <Button size="small" color="info">
          {item.rating}
        </Button>
        <Button sx={{ ml: 5 }} onClick={() => navigate(`/edit/${item.id}`)}>
          <EditIcon />
        </Button>
        <Button onClick={() => deleteMovie(item.id)}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
