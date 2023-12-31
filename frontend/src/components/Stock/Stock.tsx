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
    maxWidth: '80%',
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

    const [tickerFormError, setTickerFormError] = useState<String | undefined>(undefined)

    const showGenericErrorFetchingAllStocks = () => {
        setErrorMessage("An error happened while displaying all stocks")
        setOpenSnackbar(true)
    }

    const fetchAllStocksFromAPI = async () => {
        const {stocks, error} = await getAllStocks()

        if (error) {
            showGenericErrorFetchingAllStocks()
        } else {
            setStocks(stocks)
        }
    }

    useEffect(() => { fetchAllStocksFromAPI().catch(() => showGenericErrorFetchingAllStocks()) }, [])

    const handleCreateStock = async (event: React.FormEvent) => {
        event.preventDefault()

        const stock = {ticker, description, date: "2023-07-04", currentValue: 0.0}
        const { failure, success, fieldsValidatedWithErrors } = await createStock(stock)

        fetchAllStocksFromAPI().catch(() => showGenericErrorFetchingAllStocks())
        setSuccessMessage(success)
        setErrorMessage(failure)

        if (fieldsValidatedWithErrors) {
            setTickerFormError(fieldsValidatedWithErrors.ticker)
        }

        if (!failure) {
            setTicker("")
            setDescription("")
        }

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
                           error={!!tickerFormError}
                           helperText={tickerFormError}
                           sx={{width: 100, paddingY: '4px'}}
                           onChange={(event) => setTicker(event.target.value)} />

                <TextField label="description"
                           value={description}
                           data-testid="description"
                           sx={{width: 400}}
                           onChange={(event) => setDescription(event.target.value)} />

                <SubmitButton type="submit" variant="contained" color="primary">Submit</SubmitButton>
            </form>

            <Snackbar open={openSnackbar}
                      autoHideDuration={3000}
                      onClose={handleSnackbarClose}
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "center"
                      }}>
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