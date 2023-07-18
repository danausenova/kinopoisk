import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import { useMovieContext } from "../context/MovieContext";

const defaultTheme = createTheme();

const MovieAddPage = () => {
  const { addMovie } = useMovieContext();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    rating: 0,
    image: "",
    category: "",
  });
  function handleChange(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValue);
    if (
      !formValue.title.trim() ||
      !formValue.description.trim() ||
      !formValue.rating ||
      !formValue.image.trim() ||
      !formValue.category.trim()
    ) {
      return;
    }

    addMovie(formValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Новый фильм
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Название"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Описание"
              value={formValue.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image"
              label="Постер"
              value={formValue.image}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                sx={{ mt: 2 }}
                label="Category"
                name="category"
                value={formValue.category}
                onChange={handleChange}
              >
                <MenuItem value={"Детектив"}>Детектив</MenuItem>
                <MenuItem value={"Комедия"}>Комедия</MenuItem>
                <MenuItem value={"Драма"}>Драма</MenuItem>
              </Select>
            </FormControl>
            <Rating
              sx={{ mt: 2, mx: "auto" }}
              name="rating"
              value={formValue.rating}
              onChange={(e, newValue) => {
                setFormValue({ ...formValue, rating: newValue });
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MovieAddPage;
