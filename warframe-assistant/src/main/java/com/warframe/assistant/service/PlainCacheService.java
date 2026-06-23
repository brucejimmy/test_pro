package com.warframe.assistant.service;

import com.warframe.assistant.entity.PlainStatus;
import com.warframe.assistant.enums.PlainType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PlainCacheService {

    private static final Logger log = LoggerFactory.getLogger(PlainCacheService.class);

    private final Map<PlainType, PlainStatus> cache = new HashMap<>();

    public void updateCache(PlainType plainType, PlainStatus status) {
        cache.put(plainType, status);
        log.debug("Updated cache for {}: {}", plainType.getName(), status.getState());
    }

    public PlainStatus getFromCache(PlainType plainType) {
        return cache.get(plainType);
    }

    public Map<PlainType, PlainStatus> getAllFromCache() {
        return new HashMap<>(cache);
    }
}
