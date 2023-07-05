import React, { FC } from 'react';
import './ListStocks.css';
import StockDto from "../data/StockDto";
import {styled, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

interface ListStocksProps {
    stocks: StockDto[];
}

const Header = styled(Typography)({
    textAlign: 'left',
    marginTop: '16px',
});

const ListStocks: FC<ListStocksProps> = ({stocks}) => {

    return (
        <div>
            <Header variant="h6">List of Stocks</Header>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ticker</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {stocks.map((stock, index) => (
                        <TableRow key={index}>
                            <TableCell>{stock.ticker}</TableCell>
                            <TableCell>{stock.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    )
};

export default ListStocks;
