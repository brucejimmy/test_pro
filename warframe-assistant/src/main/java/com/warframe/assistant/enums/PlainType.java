package com.warframe.assistant.enums;

public enum PlainType {
    CETUS("cetus", "地球平原"),
    VALLIS("vallis", "金星平原"),
    CAMBIONET("cambionet", "火卫一平原");

    private final String code;
    private final String name;

    PlainType(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static PlainType fromCode(String code) {
        for (PlainType type : values()) {
            if (type.code.equalsIgnoreCase(code)) {
                return type;
            }
        }
        return null;
    }
}
