import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Card } from "../../../shared/interfaces/card.dto";
import { CardDetails } from "./CardDetails";

interface IProps {
  cards: Card[];
}

export const CardResults = ({ cards }: IProps) => {
  const [cardDetailsModalOpen, setCardDetailsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState<Card | null>(null);

  if (cards.length === 0) {
    return (
      <Typography>
        <i>No results found</i>
      </Typography>
    );
  }

  return (
    <>
      <Dialog
        open={cardDetailsModalOpen}
        onClose={() => setCardDetailsModalOpen(false)}
        maxWidth="xl"
      >
        <DialogTitle>Card Details</DialogTitle>
        <DialogContent>
          <CardDetails card={cardDetails} />
        </DialogContent>
      </Dialog>
      <Grid container spacing={1} justifyContent="center">
        {cards.map((card) => (
          <Grid item key={card.id}>
            <img
              src={card.imageSmall}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCardDetailsModalOpen(true);
                setCardDetails(card);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
