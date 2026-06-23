package com.warframe.assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

/**
 * Astrbot消息响应DTO
 * 预留对接Astrbot的响应格式
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AstrbotResponse {
    private String selfId;
    private List<Map<String, Object>> messageChain;
    private String groupId;
    private String userId;

    public static AstrbotResponse text(String text) {
        return AstrbotResponse.builder()
                .messageChain(List.of(Map.of("type", "Plain", "text", text)))
                .build();
    }

    public static AstrbotResponse textToGroup(String groupId, String text) {
        return AstrbotResponse.builder()
                .groupId(groupId)
                .messageChain(List.of(Map.of("type", "Plain", "text", text)))
                .build();
    }
}
