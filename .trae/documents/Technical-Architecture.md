# 商场秒杀小程序 - 技术架构文档

## 1. 技术架构概览

```
┌─────────────────────────────────────────┐
│              前端（Frontend）             │
│     React 18 + TypeScript + Vite        │
│     Tailwind CSS + Lucide React         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         状态管理（Zustand）               │
│   购物车状态 / 用户状态 / 秒杀数据       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Mock 数据层（LocalStorage）       │
│   商品 / 订单 / 收藏 / 收货地址          │
└─────────────────────────────────────────┘
```

## 2. 技术栈说明

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | React 18 + TypeScript | 组件化开发，类型安全 |
| 构建工具 | Vite | 快速热更新，开发体验优秀 |
| 样式 | Tailwind CSS | 原子化CSS，快速适配设计 |
| 路由 | React Router DOM v6 | 页面导航 |
| 状态管理 | Zustand | 轻量级全局状态管理 |
| 图标 | Lucide React | 线性图标库 |
| 字体 | 系统默认字体栈 | 保证跨平台一致性 |

## 3. 路由定义

| 路由 | 页面组件 | 功能描述 |
|------|----------|----------|
| `/` | `HomePage` | 首页：秒杀横幅 + 商品列表 |
| `/product/:id` | `ProductDetailPage` | 商品详情页 |
| `/cart` | `CartPage` | 购物车页面 |
| `/profile` | `ProfilePage` | 个人中心页面 |

## 4. 状态管理设计（Zustand）

### 4.1 Store 结构

```typescript
// cartStore - 购物车状态
{
  items: CartItem[],         // 购物车商品列表
  addItem: (product) => void,
  removeItem: (id) => void,
  updateQuantity: (id, qty) => void,
  toggleSelect: (id) => void,
  selectAll: () => void,
  clearCart: () => void,
  totalPrice: () => number, // 计算选中商品总价
}

// flashSaleStore - 秒杀状态
{
  activeSales: FlashSale[],  // 当前秒杀场次
  currentTime: Date,         // 实时当前时间（用于倒计时）
  products: Product[],       // 秒杀商品列表
}
```

## 5. 数据模型

### 5.1 商品模型

```typescript
interface Product {
  id: string;
  name: string;              // 商品名称
  originalPrice: number;     // 原价
  flashPrice: number;        // 秒杀价
  image: string;             // 商品图片URL
  category: string;          // 分类
  stock: number;             // 剩余库存
  soldCount: number;         // 已售数量
  description: string;       // 商品描述
  specs: Spec[];             // 规格选项
  flashSaleId?: string;     // 关联的秒杀场次ID
}

interface Spec {
  name: string;              // 规格名称（如"颜色"）
  options: string[];        // 可选值（如["红色","蓝色"]）
}
```

### 5.2 购物车模型

```typescript
interface CartItem {
  productId: string;
  quantity: number;
  selected: boolean;
  selectedSpecs: Record<string, string>; // 选中的规格
}
```

### 5.3 秒杀场次模型

```typescript
interface FlashSale {
  id: string;
  title: string;            // 场次标题（如"10:00场"）
  startTime: Date;          // 开始时间
  endTime: Date;           // 结束时间
  status: 'upcoming' | 'active' | 'ended';
}
```

## 6. 组件架构

```
src/
├── components/
│   ├── layout/
│   │   ├── BottomNav.tsx       # 底部导航栏
│   │   └── Header.tsx          # 页面顶部导航
│   ├── product/
│   │   ├── ProductCard.tsx      # 商品卡片
│   │   ├── FlashSaleBanner.tsx  # 秒杀横幅
│   │   ├── CountdownTimer.tsx   # 倒计时组件
│   │   └── SpecSelector.tsx     # 规格选择器
│   ├── cart/
│   │   ├── CartItem.tsx         # 购物车商品项
│   │   └── CartSummary.tsx      # 价格汇总
│   └── common/
│       ├── Skeleton.tsx         # 骨架屏
│       └── Badge.tsx            # 角标组件
├── pages/
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   └── ProfilePage.tsx
├── store/
│   ├── cartStore.ts
│   └── flashSaleStore.ts
├── data/
│   └── mockData.ts              # 模拟数据
├── App.tsx
└── main.tsx
```

## 7. 项目初始化命令

```bash
pnpm create vite-init@latest . --template react-ts --force
pnpm install
pnpm add react-router-dom zustand lucide-react
pnpm add -D tailwindcss postcss autoprefixer
pnpm exec tailwindcss init -p
```

## 8. 验收标准

- [ ] 首页包含秒杀横幅轮播，可自动切换
- [ ] 秒杀倒计时实时刷新，精确到秒
- [ ] 商品列表以2列网格展示，卡片信息完整
- [ ] 商品详情页展示完整商品信息，规格选择器可用
- [ ] 购物车支持单选/全选、数量增减、删除操作
- [ ] 个人中心展示用户信息和订单入口
- [ ] 所有页面间路由跳转正常
- [ ] 移动端触摸操作流畅，无布局错位
- [ ] 骨架屏加载体验良好，无布局抖动
