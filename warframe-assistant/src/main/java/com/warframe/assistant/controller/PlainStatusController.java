package com.warframe.assistant.controller;

import com.warframe.assistant.dto.ApiResponse;
import com.warframe.assistant.entity.PlainStatus;
import com.warframe.assistant.enums.PlainType;
import com.warframe.assistant.service.PlainStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plain")
public class PlainStatusController {

    private final PlainStatusService plainStatusService;

    public PlainStatusController(PlainStatusService plainStatusService) {
        this.plainStatusService = plainStatusService;
    }

    @GetMapping("/status")
    public ResponseEntity<ApiResponse<List<PlainStatus>>> getAllStatuses() {
        List<PlainStatus> statuses = plainStatusService.getAllPlainStatuses();
        return ResponseEntity.ok(ApiResponse.success(statuses));
    }

    @GetMapping("/status/{type}")
    public ResponseEntity<ApiResponse<PlainStatus>> getStatus(@PathVariable String type) {
        PlainType plainType = PlainType.fromCode(type);
        if (plainType == null) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(400, "Invalid plain type: " + type));
        }
        PlainStatus status = plainStatusService.getPlainStatus(plainType);
        return ResponseEntity.ok(ApiResponse.success(status));
    }

    @GetMapping("/cetus")
    public ResponseEntity<ApiResponse<PlainStatus>> getCetusStatus() {
        PlainStatus status = plainStatusService.getPlainStatus(PlainType.CETUS);
        return ResponseEntity.ok(ApiResponse.success(status));
    }

    @GetMapping("/vallis")
    public ResponseEntity<ApiResponse<PlainStatus>> getVallisStatus() {
        PlainStatus status = plainStatusService.getPlainStatus(PlainType.VALLIS);
        return ResponseEntity.ok(ApiResponse.success(status));
    }

    @GetMapping("/cambionet")
    public ResponseEntity<ApiResponse<PlainStatus>> getCambionetStatus() {
        PlainStatus status = plainStatusService.getPlainStatus(PlainType.CAMBIONET);
        return ResponseEntity.ok(ApiResponse.success(status));
    }
}
