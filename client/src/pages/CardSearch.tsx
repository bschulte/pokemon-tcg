import { Divider, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import React, { useState } from "react";
import { Card } from "../../../shared/interfaces/card.dto";
import { CardResults } from "../components/CardResults";

export const CardSearch = () => {
  const [name, setName] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<Card[]>([]);

  const performSearch = async () => {
    console.log("Performing search");
    setIsLoading(true);

    const response = await fetch(`/cards?name=${name}&bodyText=${bodyText}`);
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
