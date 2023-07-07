package com.kotlinapi.kotlinapi.validation

import java.lang.Exception

class StockAlreadyExistException : Exception {
    constructor(message: String) : super(message)
}
