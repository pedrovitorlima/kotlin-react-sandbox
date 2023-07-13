package com.kotlinapi.kotlinapi.validation

import java.lang.Exception

class StockAlreadyExistException : Exception {
    val validationErrors: Map<String, String>

    constructor(message: String, validationErrors: Map<String, String>) : super(message) {
        this.validationErrors = validationErrors
    }
}
