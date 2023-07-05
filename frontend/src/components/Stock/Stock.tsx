import React, {FC, useEffect, useState} from 'react';
import './Stock.css';
import {Alert, Button, Snackbar, styled, TextField, Typography} from "@mui/material";
import {createStock, getAllStocks} from "../services/StockApiService";
import ListStocks from "../ListStocks/ListStocks";
import StockDto from "../data/StockDto";

interface StockProps {}

const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '300px',
});

const Header = styled(Typography)({
    textAlign: 'center',
    marginBottom: '16px',
});

const SubmitButton = styled(Button)({
    marginTop: '16px',
});

const Stock: FC<StockProps> = () => {

    const [ticker, setTicker] = useState('')
    const [stocks, setStocks] = useState<StockDto[] | undefined>([])
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState<String | undefined>('');
    const [successMessage, setSuccessMessage] = useState<String | undefined>('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const fetchAllStocksFromAPI = async () => {
        const {stocks, error} = await getAllStocks()
        console.log(`Stocks returned: ${stocks}`)

        stocks?.forEach(stock => {
            console.log(stock)
        })

        if (error) {
            setErrorMessage("An error happened while displaying all stocks")
            setOpenSnackbar(true)
        } else {
            setStocks(stocks)
        }
    }

    useEffect(() => { fetchAllStocksFromAPI() }, [])

    const handleCreateStock = async (event: React.FormEvent) => {
        event.preventDefault()

        const stock = {ticker, description, date: "2023-07-04", currentValue: 0.0}
        const { failure, success } = await createStock(stock)
        fetchAllStocksFromAPI()
        setTicker("")
        setDescription("")
        setSuccessMessage(success)
        setErrorMessage(failure)

        setOpenSnackbar(true)
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <FormContainer data-testid="Stock">
            <Header variant="h5">Stock Form</Header>
            <form onSubmit={handleCreateStock}>
                <TextField label="ticker"
                           value={ticker}
                           data-testid="ticker"
                           sx={{width: 100, paddingY: '4px'}}
                           onChange={(event) => setTicker(event.target.value)} />

                <TextField label="description"
                           value={description}
                           data-testid="description"
                           sx={{width: 400}}
                           onChange={(event) => setDescription(event.target.value)} />

                <SubmitButton type="submit" variant="contained" color="primary">Submit</SubmitButton>
            </form>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
                {successMessage ? (
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {successMessage}
                    </Alert>
                ) : (
                    <Alert onClose={handleSnackbarClose} severity="error">
                        {errorMessage}
                    </Alert>
                )}
            </Snackbar>

            <ListStocks stocks={ stocks ? stocks : [] }></ListStocks>
        </FormContainer>
    )
}

export default Stock;