import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import {
  User,
  MapPin,
  Ticket,
  Heart,
  Settings,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const orderTabs = [
  { label: '待付款', count: 2 },
  { label: '待发货', count: 1 },
  { label: '待收货', count: 3 },
  { label: '已完成', count: 8 },
];

const menuItems = [
  { icon: MapPin, label: '收货地址', badge: '' },
  { icon: Ticket, label: '优惠券', badge: '3张可用' },
  { icon: Heart, label: '我的收藏', badge: '' },
  { icon: Bell, label: '消息通知', badge: '' },
  { icon: HelpCircle, label: '帮助与客服', badge: '' },
  { icon: Settings, label: '设置', badge: '' },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-bg_main pb-20">
      <Header title="" />

      <main className="pt-14">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary to-primary-light px-4 pt-6 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <User size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">潮流达人</h2>
              <p className="text-white/70 text-sm mt-0.5">ID: 88866688</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                  Lv.5 会员
                </span>
                <span className="bg-gold/90 text-text_primary text-xs px-2 py-0.5 rounded-full font-semibold">
                  积分: 2,860
                </span>
              </div>
            </div>
            <button className="text-white/70 hover:text-white transition-colors">
              <Settings size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-around mt-6 bg-white/10 backdrop-blur rounded-2xl py-4">
            {[
              { label: '关注', value: '128' },
              { label: '粉丝', value: '356' },
              { label: '收藏', value: '42' },
              { label: '足迹', value: '89' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-white font-bold text-base">{value}</p>
                <p className="text-white/60 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="px-4 -mt-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text_primary">我的订单</h3>
              <button className="flex items-center gap-0.5 text-text_secondary text-xs">
                全部订单
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex justify-around">
              {orderTabs.map(({ label, count }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-bg_main rounded-xl flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text_primary">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-text_secondary">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
            {menuItems.map(({ icon: Icon, label, badge }) => (
              <button
                key={label}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bg_main rounded-lg flex items-center justify-center">
                    <Icon size={18} className="text-text_primary" strokeWidth={2} />
                  </div>
                  <span className="text-sm text-text_primary">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {badge && (
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Exit */}
        <div className="px-4 mt-4 pb-4">
          <button className="w-full flex items-center justify-center gap-2 py-3 text-text_secondary text-sm hover:text-primary transition-colors">
            <LogOut size={16} strokeWidth={2} />
            退出登录
          </button>
        </div>

        <div className="h-4" />
      </main>

      <BottomNav />
    </div>
  );
}
