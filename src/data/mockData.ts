export interface Spec {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  flashPrice: number;
  image: string;
  category: string;
  stock: number;
  soldCount: number;
  description: string;
  specs: Spec[];
  flashSaleId?: string;
  tags?: string[];
}

export interface FlashSale {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  status: 'upcoming' | 'active' | 'ended';
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selected: boolean;
  selectedSpecs: Record<string, string>;
}

const now = new Date();
const plusHours = (h: number) => new Date(now.getTime() + h * 3600000);

export const flashSales: FlashSale[] = [
  {
    id: 'fs-1',
    title: '10:00 场',
    startTime: new Date(now.getTime() - 1 * 3600000),
    endTime: new Date(now.getTime() + 2 * 3600000),
    status: 'active',
  },
  {
    id: 'fs-2',
    title: '14:00 场',
    startTime: plusHours(3),
    endTime: plusHours(6),
    status: 'upcoming',
  },
  {
    id: 'fs-3',
    title: '20:00 场',
    startTime: plusHours(9),
    endTime: plusHours(12),
    status: 'upcoming',
  },
];

export const products: Product[] = [
  {
    id: 'p-001',
    name: 'iPhone 15 Pro Max 256GB 钛金色',
    originalPrice: 9999,
    flashPrice: 7999,
    image: 'https://picsum.photos/seed/iphone15/400/400',
    category: '手机数码',
    stock: 5,
    soldCount: 126,
    description: 'iPhone 15 Pro Max 搭载 A17 Pro 芯片，钛金属设计，超瓷晶面板，4800万像素主摄，支持灵动岛功能。全新 USB-C 接口，支持 USB 3 传输速度。',
    specs: [
      { name: '颜色', options: ['钛金色', '钛银色', '钛灰色'] },
      { name: '容量', options: ['256GB', '512GB', '1TB'] },
    ],
    flashSaleId: 'fs-1',
    tags: ['爆款', '限时特惠'],
  },
  {
    id: 'p-002',
    name: '戴森 Airwrap 多功能美发造型器',
    originalPrice: 3999,
    flashPrice: 2999,
    image: 'https://picsum.photos/seed/dyson/400/400',
    category: '美容仪器',
    stock: 12,
    soldCount: 89,
    description: '戴森 Airwrap 利用气流造型，无需过高温度即可打造卷发、直发等多种造型。配备多种配件，满足不同造型需求。',
    specs: [
      { name: '颜色', options: ['星云紫', '银白色', '藏青铜'] },
    ],
    flashSaleId: 'fs-1',
    tags: ['明星同款'],
  },
  {
    id: 'p-003',
    name: 'SK-II 神仙水精华液 230ml',
    originalPrice: 1599,
    flashPrice: 999,
    image: 'https://picsum.photos/seed/sk2/400/400',
    category: '美妆护肤',
    stock: 30,
    soldCount: 256,
    description: 'SK-II 护肤精华露，蕴含超过 90% PITERA™，改善肌肤状态，令肌肤晶莹剔透。适合各种肤质，每日早晚使用。',
    specs: [
      { name: '容量', options: ['75ml', '150ml', '230ml'] },
    ],
    flashSaleId: 'fs-1',
    tags: ['护肤达人推荐'],
  },
  {
    id: 'p-004',
    name: '耐克 Air Jordan 1 Retro High OG',
    originalPrice: 1699,
    flashPrice: 1199,
    image: 'https://picsum.photos/seed/airjordan/400/400',
    category: '运动鞋服',
    stock: 8,
    soldCount: 178,
    description: 'Air Jordan 1 Retro High OG 传承经典设计，以优质皮革打造，舒适脚感，时尚百搭。',
    specs: [
      { name: '尺码', options: ['40', '41', '42', '43', '44', '45'] },
      { name: '颜色', options: ['黑红', '芝加哥', '影子灰'] },
    ],
    flashSaleId: 'fs-1',
    tags: ['潮流必入'],
  },
  {
    id: 'p-005',
    name: '索尼 WH-1000XM5 头戴式降噪耳机',
    originalPrice: 2999,
    flashPrice: 2199,
    image: 'https://picsum.photos/seed/sonyxm5/400/400',
    category: '数码影音',
    stock: 20,
    soldCount: 67,
    description: '索尼 WH-1000XM5 采用全新设计的 30mm 驱动单元，搭载 HD 降噪处理器 QN1，业界领先降噪水平，30小时续航。',
    specs: [
      { name: '颜色', options: ['黑色', '铂金银', '深夜蓝'] },
    ],
    flashSaleId: 'fs-1',
    tags: ['音质旗舰'],
  },
  {
    id: 'p-006',
    name: '华为 MatePad Pro 13.2英寸平板',
    originalPrice: 5999,
    flashPrice: 4599,
    image: 'https://picsum.photos/seed/matepad/400/400',
    category: '平板办公',
    stock: 15,
    soldCount: 45,
    description: '华为 MatePad Pro 13.2英寸，搭载麒麟 9000S 芯片，配备 M-Pencil 手写笔，支持星闪连接技术，办公娱乐两相宜。',
    specs: [
      { name: '配置', options: ['12GB+256GB', '12GB+512GB', '16GB+1TB'] },
      { name: '颜色', options: ['曜金黑', '星河蓝', '雅川青'] },
    ],
    flashSaleId: 'fs-2',
    tags: ['办公神器'],
  },
  {
    id: 'p-007',
    name: '茅台飞天 53度 500ml',
    originalPrice: 2999,
    flashPrice: 1999,
    image: 'https://picsum.photos/seed/maotai/400/400',
    category: '食品酒水',
    stock: 3,
    soldCount: 312,
    description: '茅台飞天53度酱香型白酒，选用优质高粱、小麦为原料，采用传统工艺酿造，酒体醇厚，回味悠长。',
    specs: [
      { name: '年份', options: ['2023年', '2022年', '2021年'] },
    ],
    flashSaleId: 'fs-2',
    tags: ['稀缺好货'],
  },
  {
    id: 'p-008',
    name: '小米米家扫地机器人 3C',
    originalPrice: 1699,
    flashPrice: 899,
    image: 'https://picsum.photos/seed/xiaomirobot/400/400',
    category: '智能家居',
    stock: 25,
    soldCount: 134,
    description: '小米米家扫地机器人 3C，搭载 LDS 激光导航，4000Pa 强劲吸力，智能路径规划，支持米家 APP 远程控制。',
    specs: [
      { name: '版本', options: ['标准版', '增强版'] },
    ],
    flashSaleId: 'fs-2',
    tags: ['智能生活'],
  },
];

export const banners = [
  {
    id: 'b-1',
    image: 'https://picsum.photos/seed/flash1/750/300',
    title: '限时秒杀 最高省2000元',
    subtitle: 'iPhone、戴森神仙水限时特价',
  },
  {
    id: 'b-2',
    image: 'https://picsum.photos/seed/flash2/750/300',
    title: '潮流运动专场',
    subtitle: 'AJ、椰子鞋超值抢购',
  },
  {
    id: 'b-3',
    image: 'https://picsum.photos/seed/flash3/750/300',
    title: '美妆护肤狂欢节',
    subtitle: 'SK-II、兰蔻全场5折起',
  },
];
