import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSearchParams } from "react-router-dom";

const filters = ["Все", "Драма", "Детектив", "Комедия"];

// const buttons = [
//   <Button >Все</Button>,
//   <Button value="Драма">Драма</Button>,
//   <Button value="Детектив">Детектив</Button>,
//   <Button value="Комедия">Комедия</Button>,
// ];

export default function Filter() {
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
      setSearchParams();
    } else {
      setSearchParams({
        ...currentParams,
        category,
      });
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
