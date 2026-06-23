import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  onSearch?: (keyword: string) => void;
}

export default function Header({
  title = '秒杀专场',
  showSearch = false,
  onSearch,
}: HeaderProps) {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(keyword);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-primary text-white">
      <div className="flex items-center justify-between px-4 h-14">
        {title !== '' ? (
          <h1 className="text-base font-semibold truncate">{title}</h1>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          <button
            className="p-1.5 rounded-full hover:bg-primary-dark transition-colors"
            onClick={() => navigate('/profile')}
          >
            <Bell size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索商品..."
              className="w-full h-9 bg-white/20 backdrop-blur-sm rounded-full pl-10 pr-4 text-sm text-white placeholder-white/60 border border-white/20 outline-none focus:border-white/50 focus:bg-white/30 transition-all"
            />
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60"
            />
          </form>
        </div>
      )}
    </header>
  );
}
