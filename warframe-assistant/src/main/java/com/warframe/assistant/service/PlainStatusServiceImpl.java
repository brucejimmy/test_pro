package com.warframe.assistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.warframe.assistant.entity.PlainStatus;
import com.warframe.assistant.enums.PlainType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PlainStatusServiceImpl implements PlainStatusService {

    private static final Logger log = LoggerFactory.getLogger(PlainStatusServiceImpl.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${warframe.cetus.url}")
    private String cetusUrl;

    @Value("${warframe.vallis.url}")
    private String vallisUrl;

    @Value("${warframe.cambionet.url}")
    private String cambionetUrl;

    private final Map<PlainType, PlainStatus> statusCache = new ConcurrentHashMap<>();

    @Override
    public PlainStatus getPlainStatus(PlainType plainType) {
        String url = getUrlByType(plainType);
        try {
            PlainStatus status = fetchStatus(url, plainType);
            statusCache.put(plainType, status);
            return status;
        } catch (Exception e) {
            log.error("Failed to fetch {} status: {}", plainType.getName(), e.getMessage());
            return statusCache.getOrDefault(plainType, createUnknownStatus(plainType));
        }
    }

    @Override
    public List<PlainStatus> getAllPlainStatuses() {
        return Arrays.stream(PlainType.values())
                .map(this::getPlainStatus)
                .toList();
    }

    private String getUrlByType(PlainType plainType) {
        return switch (plainType) {
            case CETUS -> cetusUrl;
            case VALLIS -> vallisUrl;
            case CAMBIONET -> cambionetUrl;
        };
    }

    private PlainStatus fetchStatus(String url, PlainType plainType) throws IOException {
        JsonNode root = objectMapper.readTree(new URL(url));

        boolean isDay = root.has("isDay") && root.get("isDay").asBoolean();
        String state = root.has("state") ? root.get("state").asText() : "unknown";
        String stateChinese = isDay ? "白天" : "夜晚";
        long timeLeft = root.has("timeLeft") ? root.get("timeLeft").asLong() : 0;
        long expiry = root.has("expiry") ? root.get("expiry").asLong() : 0;
        long start = root.has("start") ? root.get("start").asLong() : 0;
        boolean isArchon = root.has("isArchon") && root.get("isArchon").asBoolean();

        return PlainStatus.builder()
                .plainType(plainType)
                .plainName(plainType.getName())
                .state(state)
                .stateChinese(stateChinese)
                .isDay(isDay)
                .timeLeft(timeLeft)
                .timeLeftFormatted(formatTimeLeft(timeLeft))
                .expiry(expiry)
                .start(start)
                .isArchon(isArchon)
                .build();
    }

    private String formatTimeLeft(long seconds) {
        if (seconds <= 0) {
            return "00:00";
        }
        long hours = seconds / 3600;
        long minutes = (seconds % 3600) / 60;
        long secs = seconds % 60;

        if (hours > 0) {
            return String.format("%02d:%02d:%02d", hours, minutes, secs);
        }
        return String.format("%02d:%02d", minutes, secs);
    }

    private PlainStatus createUnknownStatus(PlainType plainType) {
        return PlainStatus.builder()
                .plainType(plainType)
                .plainName(plainType.getName())
                .state("unknown")
                .stateChinese("未知")
                .isDay(false)
                .timeLeft(0)
                .timeLeftFormatted("--:--")
                .build();
    }
}
