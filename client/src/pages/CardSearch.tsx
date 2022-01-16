import {
  Checkbox,
  Divider,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import setData from "../data/sets.json";

import React, { useState } from "react";
import { Card } from "../../../shared/interfaces/card.dto";
import { CardResults } from "../components/CardResults";

export const CardSearch = () => {
  const [name, setName] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [formats, setFormats] = useState<string[]>([
    "Standard",
    "Extended",
    "Unlimited",
  ]);
  const [sets, setSets] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<Card[]>([]);

  const performSearch = async () => {
    console.log("Performing search");
    setIsLoading(true);

    const response = await fetch(
      `/cards?name=${name}&bodyText=${bodyText}&legalities=${formats.join(
        ","
      )}&sets=${sets.join(",")}`
    );
    const cards = await response.json();
    setResults(cards);

    setIsLoading(false);
  };

  return (
    <div>
      <Typography variant="h3">Card Search</Typography>

      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Body Text"
            variant="outlined"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        </Grid>

        <Grid item>
          <ToggleButtonGroup
            value={formats}
            onChange={(_event, newFormats) => setFormats(newFormats)}
          >
            <ToggleButton value="Standard">Standard</ToggleButton>
            <ToggleButton value="Extended">Extended</ToggleButton>
            <ToggleButton value="Unlimited">Unlimited</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item alignItems="center" justifyContent="center">
          <InputLabel id="sets-select-input">Sets</InputLabel>
          <Select
            labelId="sets-select-input"
            sx={{ width: 200 }}
            multiple
            value={sets}
            onChange={(e) => {
              const { value } = e.target;
              setSets(typeof value === "string" ? value.split(",") : value);
            }}
            input={<OutlinedInput label="Sets" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {setData
              .slice()
              .reverse()
              .map((set) => (
                <MenuItem key={set.id} value={set.id}>
                  <Checkbox checked={sets.indexOf(set.id) > -1} />
                  <img width="16" src={set.images.symbol} />
                  <ListItemText primary={set.name} sx={{ marginLeft: 1 }} />
                </MenuItem>
              ))}
          </Select>
        </Grid>
      </Grid>

      <LoadingButton
        variant="contained"
        onClick={performSearch}
        loading={isLoading}
      >
        Submit
      </LoadingButton>

      <Divider sx={{ paddingY: 2 }} />

      <CardResults cards={results} />
    </div>
  );
};
