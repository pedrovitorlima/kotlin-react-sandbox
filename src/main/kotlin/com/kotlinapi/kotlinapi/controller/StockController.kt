package com.kotlinapi.kotlinapi.controller

import com.kotlinapi.kotlinapi.model.Stock
import com.kotlinapi.kotlinapi.model.ValidationError
import com.kotlinapi.kotlinapi.service.StockService
import com.kotlinapi.kotlinapi.validation.StockAlreadyExistException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/stock")
class StockController(val stockService: StockService) {

    @ExceptionHandler(StockAlreadyExistException::class)
    fun handleStockExist(e: StockAlreadyExistException) : ResponseEntity<ValidationError> =
        ResponseEntity(ValidationError(e.message ?: "Validation has failed", e.validationErrors), HttpStatus.BAD_REQUEST)

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createStock(@RequestBody stock: Stock): Stock = stockService.save(stock)

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    fun getOneStock(@PathVariable id : Int): Stock? = stockService.getStock(id)

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    fun getOneStock(): MutableIterable<Stock> = stockService.getStock()

}