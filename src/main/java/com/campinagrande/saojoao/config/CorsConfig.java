package com.campinagrande.saojoao.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5173",  // Vite
                        "http://localhost:5500",  // VS Code Live Server
                        "http://localhost:5501",  // Live Server alt
                        "http://127.0.0.1:5500",
                        "http://127.0.0.1:5501",
                        "null"                    // file:// direto no navegador
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}
