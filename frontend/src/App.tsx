import React from 'react';
import './App.css';

import Menu from "./components/Menu/Menu";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Wallet from "./components/Wallet/Wallet";
import Stock from "./components/Stock/Stock";
import {Box, styled} from "@mui/material";

const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
});

function App() {
  return (
      <Box
          display="flex"
          justifyContent="center"
          height="100vh">
          <FormContainer>
              <BrowserRouter>
                <Menu></Menu>
                  <FormContainer>
                    <Routes>
                      <Route path="/wallets/manage" element={<Wallet />} />
                      <Route path="/wallets/stocks-of-interest" element={<Stock />} />
                    </Routes>
                  </FormContainer>
              </BrowserRouter>
          </FormContainer>
      </Box>
    );
}


export default App;
