package com.campinagrande.saojoao.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API São João de Campina Grande")
                        .description("""
                                API do Maior São João do Mundo 🎉
                                
                                Campina Grande - Paraíba - Brasil
                                
                                Endpoints para consultar polos culturais, shows, artistas
                                e toda a programação do mês junino.
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("São João CG")
                                .email("marcustoledo26@gmail.com")));
    }
}
