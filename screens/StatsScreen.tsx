
import React, { useMemo } from 'react';
import { VehicleRecord, CategoryType } from '../types';
import { ArrowLeft, Bell, TrendingUp, Wallet, ArrowUp, ArrowDown, Download, Filter, MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface StatsScreenProps {
  records: VehicleRecord[];
  onBack: () => void;
}

const DATA = [
  { name: 'Tuần 1', value: 45 },
  { name: 'Tuần 2', value: 72 },
  { name: 'Tuần 3', value: 58 },
  { name: 'Tuần 4', value: 90 },
];

export const StatsScreen: React.FC<StatsScreenProps> = ({ records, onBack }) => {
  const stats = useMemo(() => {
    let totalRevenue = 0;
    let totalProfit = 0;
    const catProfit: Record<string, number> = {
      [CategoryType.HONDA_PT]: 0,
      [CategoryType.OLD_CAR]: 0,
      [CategoryType.EXTERNAL_CAR]: 0,
    };

    records.forEach(r => {
      // Updated formula: Profit = Mica + Service Fee
      const profit = (r.micaFee || 0) + (r.serviceFee || 0);
      
      totalRevenue += r.expectedRevenue || 0;
      totalProfit += profit;
      catProfit[r.category] += profit;
    });

    // Total Costs are inferred for the report display as Revenue - Profit 
    // or we can calculate them explicitly if preferred, but profit is now fixed to mica+service.
    const totalCosts = records.reduce((s, r) => s + (r.entryCost || 0) + (r.withdrawalCost || 0), 0);
    
    return { totalRevenue, totalCosts, totalProfit, catProfit };
  }, [records]);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-slate-900">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-xl text-slate-900">Thống kê Lợi nhuận</h2>
        <button className="p-2 relative">
          <Bell size={24} className="text-slate-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6">
        {['Ngày', 'Tuần', 'Tháng', 'Năm'].map(p => (
          <button 
            key={p}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${p === 'Tháng' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 mb-6">
        <p className="text-sm opacity-80 mb-1">Tổng Lợi nhuận</p>
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">{stats.totalProfit.toLocaleString('vi-VN')} đ</h1>
        </div>
        <div className="mt-2 inline-flex items-center bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
           <TrendingUp size={10} className="mr-1" /> +12% so với tháng trước
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Wallet size={16} />
            </div>
            <span className="text-[10px] bg-green-50 text-green-500 px-1.5 py-0.5 rounded font-bold">+5%</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Tổng Doanh thu</p>
          <p className="font-bold text-slate-900">{stats.totalRevenue.toLocaleString('vi-VN')} đ</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
               <ArrowUp size={16} />
            </div>
            <span className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded font-bold">-2%</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">Tổng Chi phí Nhập/Rút</p>
          <p className="font-bold text-slate-900">{stats.totalCosts.toLocaleString('vi-VN')} đ</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-bold text-slate-900">Xu hướng lợi nhuận</h3>
            <p className="text-[10px] text-gray-400">Dữ liệu 4 tuần gần nhất</p>
          </div>
          <button className="text-gray-400"><MoreHorizontal size={20} /></button>
        </div>
        <div className="h-40 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-2 px-2">
          {DATA.map(d => <span key={d.name} className="text-[10px] text-gray-400">{d.name}</span>)}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900">Phân bổ theo loại xe</h3>
          <span className="text-[10px] font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded-lg">100%</span>
        </div>
        
        <div className="space-y-6">
          {Object.entries(stats.catProfit).map(([cat, profitVal], i) => {
             const profit = profitVal as number;
             const percent = Math.round((profit / stats.totalProfit) * 100) || 0;
             const colors = ['bg-blue-600', 'bg-cyan-400', 'bg-purple-500'];
             const dotColors = ['bg-blue-600', 'bg-cyan-400', 'bg-purple-500'];
             return (
               <div key={cat} className="space-y-2">
                 <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2 font-medium text-slate-700">
                       <div className={`w-2 h-2 rounded-full ${dotColors[i]}`} />
                       <span>{cat}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                       <span className="font-bold">{profit.toLocaleString('vi-VN')} đ</span>
                       <span className="text-gray-400">({percent}%)</span>
                    </div>
                 </div>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`${colors[i]} h-full`} style={{ width: `${percent}%` }} />
                 </div>
               </div>
             );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-8">
         <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-gray-100 text-gray-600 space-y-2">
            <Download size={24} className="text-blue-600" />
            <span className="text-xs font-bold">Xuất báo cáo</span>
         </button>
         <button className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-gray-100 text-gray-600 space-y-2">
            <Filter size={24} className="text-blue-600" />
            <span className="text-xs font-bold">Cấu hình</span>
         </button>
      </div>
    </div>
  );
};
