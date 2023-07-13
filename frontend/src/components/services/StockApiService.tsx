import StockDto from "../data/StockDto";

interface ResponseMessage {
    success?: String,
    failure?: String,
    fieldsValidatedWithErrors?: any
}

const BASE_URL = 'http://localhost:9000/api/stock';

const createStock = async (payload: StockDto) : Promise<ResponseMessage> => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            return {success: "Stock saved successfully"}
        } else {
            const validationObject = await response.json()
            return { failure: validationObject.generalError, fieldsValidatedWithErrors: validationObject.validationErrors  }
        }

    } catch (error) {
        console.error('Error:', error);
        return {failure: "An error happened while saving the stock"}
    }
}

const getAllStocks = async () : Promise<{stocks?: StockDto[], error: boolean}> => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const allStocks : StockDto[] = await response.json()

        if (response.ok) {
            return { stocks: allStocks, error: false }
        } else {
            return { error: true }
        }
    } catch(error) {
        console.error(error)
        return { error:true }
    }
}

export { createStock, getAllStocks }