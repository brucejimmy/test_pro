package com.warframe.assistant.service;

import com.warframe.assistant.enums.PlainType;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlainStatusScheduler {

    private static final Logger log = LoggerFactory.getLogger(PlainStatusScheduler.class);

    private final PlainStatusService plainStatusService;

    @Value("${warframe.update-interval:60000}")
    private long updateInterval;

    public PlainStatusScheduler(PlainStatusService plainStatusService) {
        this.plainStatusService = plainStatusService;
    }

    @PostConstruct
    public void init() {
        log.info("Initializing plain status scheduler with interval: {}ms", updateInterval);
        refreshAllStatuses();
    }

    @Scheduled(fixedRateString = "${warframe.update-interval:60000}")
    public void refreshAllStatuses() {
        try {
            List<com.warframe.assistant.entity.PlainStatus> statuses = plainStatusService.getAllPlainStatuses();
            for (var status : statuses) {
                log.debug("Refreshed {}: {} - {} remaining", 
                        status.getPlainName(), 
                        status.getStateChinese(),
                        status.getTimeLeftFormatted());
            }
            log.info("Successfully refreshed all plain statuses");
        } catch (Exception e) {
            log.error("Failed to refresh plain statuses: {}", e.getMessage());
        }
    }
}
