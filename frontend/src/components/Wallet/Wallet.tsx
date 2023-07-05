import React, { FC } from 'react';
import './Wallet.css';

interface WalletProps {}

const Wallet: FC<WalletProps> = () => (
  <div className="Wallet" data-testid="Wallet">
    Wallet Component
  </div>
);

export default Wallet;
