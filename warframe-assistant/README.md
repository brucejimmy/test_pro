# Warframe Assistant - 国服星际战甲小助手

## 项目简介

基于Spring Boot的国服星际战甲平原状态查询小助手，预留Astrbot接口可对接QQ机器人。

## 功能特性

- 支持查询地球平原（Cetus）、金星平原（Vallis）、火卫一平原（Cambionet）状态
- 自动定时更新平原状态
- 预留Astrbot WebHook接口，可对接QQ机器人

## API接口

### 平原状态接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/plain/status` | GET | 获取所有平原状态 |
| `/api/plain/status/{type}` | GET | 获取指定平原状态 (cetus/vallis/cambionet) |
| `/api/plain/cetus` | GET | 获取地球平原状态 |
| `/api/plain/vallis` | GET | 获取金星平原状态 |
| `/api/plain/cambionet` | GET | 获取火卫一平原状态 |

### Astrbot对接接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/astrobot/webhook` | POST | 接收Astrbot消息 |
| `/api/astrobot/health` | GET | 健康检查 |
| `/api/astrobot/refresh` | POST | 手动刷新状态 |

## Astrbot配置

在Astrbot的配置文件中添加反向WS/Webhook指向本服务：

```yaml
# Astrbot配置示例
adapters:
  - type: http
    enabled: true
    webhook:
      urls:
        - http://your-server:8080/api/astrobot/webhook
```

## 启动方式

```bash
# 编译
mvn clean package

# 运行
java -jar target/warframe-assistant-1.0.0.jar
```

## 配置说明

在 `application.yml` 中可配置以下参数：

```yaml
warframe:
  cetus.url: https://content.warframe.com/MobileExport/Manifest/CetusCycle.json
  vallis.url: https://content.warframe.com/MobileExport/Manifest/VallisCycle.json
  cambionet.url: https://content.warframe.com/MobileExport/Manifest/CambionetCycle.json
  update-interval: 60000  # 状态刷新间隔(毫秒)

astrobot:
  enabled: true
  api-path: /api/astrobot
```

## QQ机器人命令

| 命令 | 描述 |
|------|------|
| 平原 / 平原状态 | 查看所有平原状态 |
| /地球 / cetus | 查看地球平原状态 |
| /金星 / vallis | 查看金星平原状态 |
| /火卫一 / cambionet | 查看火卫一平原状态 |
| /help / 帮助 | 显示帮助信息 |
