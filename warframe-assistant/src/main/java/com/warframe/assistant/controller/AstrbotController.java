package com.warframe.assistant.controller;

import com.warframe.assistant.dto.ApiResponse;
import com.warframe.assistant.dto.AstrbotMessageEvent;
import com.warframe.assistant.dto.AstrbotResponse;
import com.warframe.assistant.entity.PlainStatus;
import com.warframe.assistant.enums.PlainType;
import com.warframe.assistant.service.PlainStatusService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Astrbot对接控制器
 * 预留接口用于对接QQ机器人平台
 */
@RestController
@RequestMapping("/api/astrobot")
public class AstrbotController {

    private static final Logger log = LoggerFactory.getLogger(AstrbotController.class);

    private final PlainStatusService plainStatusService;

    @Value("${astrobot.enabled:true}")
    private boolean astrobotEnabled;

    public AstrbotController(PlainStatusService plainStatusService) {
        this.plainStatusService = plainStatusService;
    }

    /**
     * 接收Astrbot消息的WebHook接口
     * Astrbot会将QQ消息转发到此处
     */
    @PostMapping("/webhook")
    public AstrbotResponse handleMessage(@RequestBody AstrbotMessageEvent event) {
        log.info("Received Astrbot message: {}", event);

        if (!astrobotEnabled) {
            log.warn("Astrbot integration is disabled");
            return null;
        }

        String rawMessage = event.getRawMessage();
        if (rawMessage == null || rawMessage.isBlank()) {
            return null;
        }

        String message = rawMessage.trim().toLowerCase();

        if (message.startsWith("/平原") || message.startsWith("平原") || message.equals("平原状态")) {
            return handlePlainStatus(event);
        }

        if (message.startsWith("/地球") || message.equals("地球平原") || message.equals("cetus")) {
            return handleSpecificPlain(event, PlainType.CETUS);
        }

        if (message.startsWith("/金星") || message.equals("金星平原") || message.equals("vallis")) {
            return handleSpecificPlain(event, PlainType.VALLIS);
        }

        if (message.startsWith("/火卫一") || message.equals("火卫一平原") || message.equals("cambionet")) {
            return handleSpecificPlain(event, PlainType.CAMBIONET);
        }

        if (message.equals("/help") || message.equals("帮助")) {
            return handleHelp(event);
        }

        return null;
    }

    /**
     * 获取所有平原状态
     */
    private AstrbotResponse handlePlainStatus(AstrbotMessageEvent event) {
        List<PlainStatus> statuses = plainStatusService.getAllPlainStatuses();
        StringBuilder sb = new StringBuilder();
        sb.append("【星际战甲平原状态】\n\n");

        for (PlainStatus status : statuses) {
            sb.append(formatPlainStatus(status)).append("\n");
        }

        sb.append("\n发送 /help 查看更多命令");

        return buildResponse(event, sb.toString());
    }

    /**
     * 获取特定平原状态
     */
    private AstrbotResponse handleSpecificPlain(AstrbotMessageEvent event, PlainType plainType) {
        PlainStatus status = plainStatusService.getPlainStatus(plainType);
        String response = formatPlainStatus(status);
        return buildResponse(event, response);
    }

    /**
     * 帮助信息
     */
    private AstrbotResponse handleHelp(AstrbotMessageEvent event) {
        String help = """
                【星际战甲小助手帮助】

                命令列表:
                · 平原 / 平原状态 - 查看所有平原状态
                · /地球 / cetus - 查看地球平原状态
                · /金星 / vallis - 查看金星平原状态
                · /火卫一 / cambionet - 查看火卫一平原状态
                · /help / 帮助 - 显示此帮助信息

                国服星际战甲小助手
                """;
        return buildResponse(event, help);
    }

    /**
     * 格式化平原状态信息
     */
    private String formatPlainStatus(PlainStatus status) {
        String archonInfo = status.isArchon() ? " [阿耶衍识品]" : "";
        return String.format("【%s】%s%s\n  剩余时间: %s",
                status.getPlainName(),
                status.getStateChinese(),
                archonInfo,
                status.getTimeLeftFormatted());
    }

    /**
     * 构建响应消息
     */
    private AstrbotResponse buildResponse(AstrbotMessageEvent event, String text) {
        return AstrbotResponse.builder()
                .selfId(event.getSelfId())
                .groupId(event.getGroupId())
                .userId(event.getUserId())
                .messageChain(List.of(
                        java.util.Map.of(
                                "type", "Plain",
                                "text", text
                        )
                ))
                .build();
    }

    /**
     * 健康检查接口
     */
    @GetMapping("/health")
    public ApiResponse<String> health() {
        return ApiResponse.success("Astrbot integration is " + (astrobotEnabled ? "enabled" : "disabled"));
    }

    /**
     * 手动触发状态更新
     */
    @PostMapping("/refresh")
    public ApiResponse<String> refresh() {
        plainStatusService.getAllPlainStatuses();
        return ApiResponse.success("Plain statuses refreshed");
    }
}
