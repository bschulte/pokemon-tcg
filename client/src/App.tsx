import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AppBar, Button } from "@mui/material";
import { CardSearch } from "./pages/CardSearch";

export default function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Box sx={{ flexGrow: 1, display: "flex", padding: 2 }}>
          <Button href="/" sx={{ color: "white" }}>
            Home
          </Button>
          <Button href="/card-search" sx={{ color: "white" }}>
            Card Search
          </Button>
        </Box>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card-search" element={<CardSearch />} />
      </Routes>
    </Container>
  );
}
