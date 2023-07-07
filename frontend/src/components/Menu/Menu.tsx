import React, {FC, useState} from 'react';
import './Menu.css';
import {Button, ListItemIcon, ListItemText, Menu as MenuReact, MenuItem} from "@mui/material";
import WalletIcon from '@mui/icons-material/Wallet';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import {Link} from "react-router-dom";
import {SpaceDashboard} from "@mui/icons-material";

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
    const [manageWalletsEl, setManageWalletsEl] = useState<null | HTMLElement>(null)
    const [financialGoalsEl, setFinancialGoalsEl] = useState<null | HTMLElement>(null)

    const handleManageWalletsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setManageWalletsEl(event.currentTarget)
    }

    const handleWalletMenuClose = () => {
        setManageWalletsEl(null)
    }

    const handleMenuItemClick = (item: string) => {
        handleWalletMenuClose()
    }

    const handleFinancialGoalsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFinancialGoalsEl(event.currentTarget)
    }

    const handleFinancialGoalsClose = () => {
        setFinancialGoalsEl(null)
    }

    return (
        <div>
            <Button onClick={handleManageWalletsOpen} className="menuButton" variant="outlined">
                <ListItemIcon><WalletIcon/></ListItemIcon>
                <ListItemText>Manage Wallets</ListItemText>
            </Button>

            <Button onClick={handleFinancialGoalsOpen} className="menuButton" variant="outlined">
                <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
                <ListItemText>Financial goals</ListItemText>
            </Button>

            <MenuReact anchorEl={manageWalletsEl}
                       open={Boolean(manageWalletsEl)}
                        onClose={handleWalletMenuClose}>

                <MenuItem component={Link} to="/wallets/manage" onClick={() => handleMenuItemClick('viewWallets')}>
                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                    <ListItemText>view my wallets</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('changeOrRemove')}>
                    <ListItemIcon><EditNoteIcon /></ListItemIcon>
                    <ListItemText>edit wallets</ListItemText>
                </MenuItem>

                <MenuItem component={Link} to="/wallets/stocks-of-interest" onClick={() => handleMenuItemClick('addStocksOfInterest')}>
                    <ListItemIcon><ShowChartIcon /></ListItemIcon>
                    <ListItemText>add stocks of interest</ListItemText>
                </MenuItem>

            </MenuReact>

            <MenuReact anchorEl={financialGoalsEl}
                       open={Boolean(financialGoalsEl)}
                       onClose={handleFinancialGoalsClose}>

                <MenuItem component={Link} to="/financial-goals/manage" onClick={() => handleMenuItemClick('manageGoals')}>
                    <ListItemIcon><ModeStandbyIcon /></ListItemIcon>
                    <ListItemText>manage goals</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('manageBudget')}>
                    <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                    <ListItemText>manage budgets</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('goalsDashboard')}>
                    <ListItemIcon><SpaceDashboard /></ListItemIcon>
                    <ListItemText>goals dashboard</ListItemText>
                </MenuItem>

            </MenuReact>
        </div>
    )
};

export default Menu;
