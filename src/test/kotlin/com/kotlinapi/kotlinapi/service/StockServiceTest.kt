package com.kotlinapi.kotlinapi.service

import com.kotlinapi.kotlinapi. data.StockRepository
import com.kotlinapi.kotlinapi.model.Stock
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.runs
import io.mockk.verify
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.MockitoAnnotations
import java.time.LocalDate
import java.util.*

@ExtendWith(MockKExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class StockServiceTest {

    @RelaxedMockK
    private lateinit var stockRepository : StockRepository

    private lateinit var stockService : StockService

    @BeforeAll
    fun setup() {
        stockService = StockService(stockRepository)
    }

    @Test
    fun `Should create a stock given a valid stock`() {
        val stock = Stock(1, "TWKS", "description", "7.5", LocalDate.now())
        every { stockRepository.save(stock) } returns stock

        stockService.save(stock)

        verify { stockRepository.save(stock) }
    }

    @Test
    fun `Should return a stock given id`() {
        every { stockRepository.findById(any()) } returns Optional.of(Stock(1, "", "description", "", LocalDate.now()))
        stockService.getStock(1)
        verify { stockRepository.findById(1) }
    }
}