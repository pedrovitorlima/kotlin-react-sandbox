package com.kotlinapi.kotlinapi.service

import com.kotlinapi.kotlinapi.data.StockRepository
import com.kotlinapi.kotlinapi.model.Stock
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.stereotype.Service
import java.time.LocalDate
import kotlin.jvm.optionals.getOrNull

@Service
class StockService(val stockRepository: StockRepository) {
    fun save(stock: Stock) = stockRepository.save(stock)
    fun getStock(id: Int): Stock? = stockRepository.findById(id).getOrNull()
    fun getStock(): MutableIterable<Stock> = stockRepository.findAll()
}
