package com.warframe.assistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WarframeAssistantApplication {

    public static void main(String[] args) {
        SpringApplication.run(WarframeAssistantApplication.class, args);
    }
}
