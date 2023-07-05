package com.kotlinapi.kotlinapi

import org.springframework.boot.autoconfigure.AutoConfigurationPackage
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
@AutoConfigurationPackage
class KotlinapiApplication {
	@Bean
	fun corsConfigurer(): WebMvcConfigurer {
		return object: WebMvcConfigurer {
			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/**")
					.allowedOrigins("*")
					.allowedMethods("GET", "POST", "PUT", "DELETE")
					.allowedHeaders("*")
			}
		}
	}
}

fun main(args: Array<String>) {
	runApplication<KotlinapiApplication>(*args)
}