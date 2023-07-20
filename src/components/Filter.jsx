import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSearchParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import { LIMIT } from "../utils/consts";

const filters = ["Все", "Драма", "Детектив", "Комедия"];

export default function Filter() {
  const { setPage } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = React.useState(
    searchParams.get("category") || "Все"
  );

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  React.useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (category === "Все") {
      const { _page, q } = currentParams;
      setSearchParams({
        _limit: LIMIT,
        _page: _page || 1,
        // q: q || "",
      });
    } else {
      setSearchParams({
        ...currentParams,
        category,
      });
      setPage(1);
    }
  }, [category]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        size="large"
        aria-label="large button group"
        onClick={handleChange}
      >
        {filters.map((item) => (
          <Button value={item}>{item}</Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
