package com.kotlinapi.kotlinapi.service

import com.kotlinapi.kotlinapi.data.StockRepository
import com.kotlinapi.kotlinapi.model.Stock
import com.kotlinapi.kotlinapi.validation.StockAlreadyExistException
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull
@Service
class StockService(val stockRepository: StockRepository) {

    fun save(stock: Stock): Stock {
        val existingStock = stockRepository.findByTicker(stock.ticker)
        if (existingStock.isPresent) {
            throw StockAlreadyExistException("The stock cannot be created due to validation errors", mapOf("ticker" to "This ticker is already being used"));
        }

        stockRepository.save(stock)
        return stock
    }

    fun getStock(id: Int): Stock? = stockRepository.findById(id).getOrNull()

    fun getStock(): MutableIterable<Stock> = stockRepository.findAll()
}

