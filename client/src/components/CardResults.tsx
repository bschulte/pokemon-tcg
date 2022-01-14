import { Grid, Typography } from "@mui/material";
import React from "react";
import { Card } from "../../../shared/interfaces/card.dto";

interface IProps {
  cards: Card[];
}

export const CardResults = ({ cards }: IProps) => {
  if (cards.length === 0) {
    return (
      <Typography>
        <i>No results found</i>
      </Typography>
    );
  }

  return (
    <Grid container spacing={1} justifyContent="center">
      {cards.map((card) => (
        <Grid item key={card.id}>
          <img src={card.imageSmall} />
        </Grid>
      ))}
    </Grid>
  );
};
