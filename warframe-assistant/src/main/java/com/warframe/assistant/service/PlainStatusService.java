package com.warframe.assistant.service;

import com.warframe.assistant.entity.PlainStatus;
import com.warframe.assistant.enums.PlainType;

import java.util.List;

public interface PlainStatusService {
    PlainStatus getPlainStatus(PlainType plainType);
    List<PlainStatus> getAllPlainStatuses();
}
