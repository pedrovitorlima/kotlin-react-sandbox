package com.kotlinapi.kotlinapi.service

import com.kotlinapi.kotlinapi. data.StockRepository
import com.kotlinapi.kotlinapi.model.Stock
import com.kotlinapi.kotlinapi.validation.StockAlreadyExistException
import io.mockk.called
import io.mockk.every
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.*
import org.junit.jupiter.api.extension.ExtendWith
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

    @Nested
    @DisplayName("Create Stock")
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    inner class  CreateStockTest{
        @Test
        fun `Should throw exception given a stock with same ticker already exists`() {
            val stock = Stock(1, "TWKS", "description", "7.5", LocalDate.now())
            val existingStock = Stock(1, "TWKS", "description", "7.5", LocalDate.now())
            val expectedValidationError = mapOf("ticker" to "This ticker is already being used")

            every { stockRepository.findByTicker(stock.ticker) } returns Optional.of(existingStock)

            val exception = assertThrows<StockAlreadyExistException> { (stockService.save(stock))  }
            assertThat(exception.message).isEqualTo("The stock cannot be created due to validation errors")
            assertThat(exception.validationErrors).isEqualTo(expectedValidationError)
            verify{ stockRepository.save(stock) wasNot called }
        }

        @Test
        fun `Should create a stock given a valid stock`() {
            val stock = Stock(1, "TWKS", "description", "7.5", LocalDate.now())
            every { stockRepository.save(stock) } returns stock

            stockService.save(stock)

            verify { stockRepository.save(stock) }
        }
    }

    @Test
    fun `Should return a stock given id`() {
        every { stockRepository.findById(any()) } returns Optional.of(Stock(1, "", "description", "", LocalDate.now()))
        stockService.getStock(1)
        verify { stockRepository.findById(1) }
    }
}