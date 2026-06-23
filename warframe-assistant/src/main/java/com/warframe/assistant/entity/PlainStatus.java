package com.warframe.assistant.entity;

import com.warframe.assistant.enums.PlainType;
import lombok.Data;

@Data
public class PlainStatus {
    private PlainType plainType;
    private String plainName;
    private String state;
    private String stateChinese;
    private boolean isDay;
    private long timeLeft;
    private String timeLeftFormatted;
    private long expiry;
    private long start;
    private boolean isArchon;
}
