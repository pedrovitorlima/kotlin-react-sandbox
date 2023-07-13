package com.kotlinapi.kotlinapi.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.kotlinapi.kotlinapi.model.Stock
import com.kotlinapi.kotlinapi.model.ValidationError
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.objectweb.asm.TypeReference
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.*
import java.time.LocalDate


@SpringBootTest
@AutoConfigureMockMvc
internal class StockControllerTest @Autowired constructor(
    val mockMvc : MockMvc,
    val objectMapper: ObjectMapper
){
    val baseUrl = "/api/stock"
    
    @Nested
    @DisplayName("PUT Stock endpoint")
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    inner class  PutStock {
        
        @Test
        fun `should return HTTP code CREATED given a stock was created`() {
            val stock = Stock(1, "twks", "description", "6.50", LocalDate.now())
            val response = mockMvc.put(baseUrl) {
                content = objectMapper.writeValueAsString(stock)
                contentType = MediaType.APPLICATION_JSON
            }

            response.andDo { println() }
                .andExpect {
                    status { isCreated() }
                    content { contentType(MediaType.APPLICATION_JSON) }
                    jsonPath("$.id") { value(stock.id) }
                }
        }

        @Test
        fun `Should return error message and bad request if the a stock with same ticker already exists`() {
            val stock = Stock(0, "twks", "description", "6.50", LocalDate.now())
            create(stock)

            val newStock = Stock(0, "twks", "any other description", "10.0", LocalDate.now())
            val response = mockMvc.put(baseUrl) {
                content = objectMapper.writeValueAsString(newStock)
                contentType = MediaType.APPLICATION_JSON
            }

            val validationErrorsObject = ValidationError("The stock cannot be created due to validation errors",
                mapOf("ticker" to "This ticker is already being used"))
            response.andExpect {
                    status { isBadRequest() }
                    content { objectMapper.writeValueAsString(validationErrorsObject) }
                }

        }
    }

    @Nested
    @DisplayName("GET Stock endpoint")
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    inner class  GetStock {
        @Test
        fun `Should return a stock given it exists in the database`() {
            val savedStock = create(Stock(0, "twks", "description", "6.50", LocalDate.now()))

            mockMvc.get("$baseUrl/${savedStock.id}") { contentType = MediaType.APPLICATION_JSON }
                .andExpect {
                    content { contentType(MediaType.APPLICATION_JSON) }
                    jsonPath("$.id") { value(savedStock.id) }
                    jsonPath("$.ticker") { value(savedStock.ticker) }
                    jsonPath("$.currentValue") { value(savedStock.currentValue) }
                    jsonPath("$.date") { value(savedStock.date.toString()) }
                }
        }
    }

    @Nested
    @DisplayName("GetAll endpoint")
    @TestInstance(TestInstance.Lifecycle.PER_CLASS)
    inner class GetAllStocks  {
        @Test
        fun `Should return all stocks given multiple ones exists in the database`() {
            val stock1 = create(create(Stock(0, "twks", "description", "6.50", LocalDate.now())))
            val stock2 = create(create(Stock(0, "abcd", "description", "6.50", LocalDate.now())))
            val stock3 = create(create(Stock(0, "xyzh", "description", "6.50", LocalDate.now())))

            val responseAsString = mockMvc.get("$baseUrl/") { contentType = MediaType.APPLICATION_JSON }
                .andExpect { content { contentType(MediaType.APPLICATION_JSON) } }
                .andReturn()
                .response
                .contentAsString

            var expectedListAsJSON = objectMapper.writeValueAsString(listOf(stock1, stock2, stock3))
            assertThat(responseAsString).isEqualTo(expectedListAsJSON)
        }
    }


    private fun create(stock: Stock): Stock {
        val responseJson = mockMvc.put(baseUrl) {
            content = objectMapper.writeValueAsString(stock)
            contentType = MediaType.APPLICATION_JSON
        }
            .andReturn()
            .response
            .contentAsString
        return objectMapper.readValue(responseJson, Stock::class.java)
    }

}