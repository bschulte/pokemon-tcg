import { Grid } from "@mui/material";
import React from "react";
import { Card } from "../../../shared/interfaces/card.dto";

interface IProps {
  card: Card | null;
}

export const CardDetails = ({ card }: IProps) => {
  if (!card) {
    return null;
  }

  return (
    <Grid container>
      <Grid item>
        <img width="480" src={card.imageLarge} />
      </Grid>
    </Grid>
  );
};
