package com.kotlinapi.kotlinapi.model

data class ValidationError (
    val generalError: String,
    val validationErrors: Map<String, String>)
