package com.warframe.assistant.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

/**
 * Astrbot消息事件DTO
 * 预留对接Astrbot的接口格式
 */
@Data
public class AstrbotMessageEvent {
    private String selfId;
    private String userId;
    private String userName;
    private String groupId;
    private String groupName;
    private String messageId;
    private String rawMessage;
    private List<Map<String, Object>> messageChain;
    private String platform;
    private String type;
    private long timestamp;
}
