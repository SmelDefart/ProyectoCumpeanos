package com.eldar.ejercicio.cumpleanos.config;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public Validator getValidation(){
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        return validator;
    }

}
