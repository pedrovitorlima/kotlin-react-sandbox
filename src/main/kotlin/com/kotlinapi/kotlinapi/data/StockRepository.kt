package com.kotlinapi.kotlinapi.data

import com.kotlinapi.kotlinapi.model.Stock
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface StockRepository : CrudRepository<Stock, Int> {
    fun findByTicker(ticker: String): Optional<Stock>
}

