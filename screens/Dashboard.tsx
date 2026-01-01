
import React, { useMemo } from 'react';
import { VehicleRecord, CategoryType, RecordStatus } from '../types';
import { Bell, ArrowUpRight, TrendingUp, Car, FileText, ChevronRight, CheckCircle2, RefreshCcw, FolderPlus } from 'lucide-react';

interface DashboardProps {
  records: VehicleRecord[];
  onCreate: (category: CategoryType) => void;
  onViewAll: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ records, onCreate, onViewAll }) => {
  const stats = useMemo(() => {
    const totalProfit = records.reduce((sum, r) => {
      const p = r.expectedRevenue - (r.micaFee + r.serviceFee + (r.entryCost || 0) + (r.withdrawalCost || 0));
      return sum + p;
    }, 0);
    const processing = records.filter(r => r.status !== RecordStatus.COMPLETED).length;
    return { totalProfit, processing };
  }, [records]);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-orange-200" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Xin chào,</p>
            <h2 className="font-bold text-slate-900">Admin User</h2>
          </div>
        </div>
        <button className="p-2 relative">
          <Bell size={24} className="text-slate-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      {/* Monthly Summary Card */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 mb-8 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-80 mb-1">Tổng quan tháng 10</p>
            <h1 className="text-3xl font-bold">{stats.totalProfit.toLocaleString('vi-VN')}đ</h1>
            <p className="text-xs mt-2 flex items-center opacity-90">
              <ArrowUpRight size={14} className="mr-1" />
              +12.5% so với tháng trước
            </p>
          </div>
          <div className="bg-white/20 p-2 rounded-xl">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="flex justify-between items-end mt-8">
          <div>
            <p className="text-xs opacity-80 mb-1">Đang xử lý</p>
            <p className="text-xl font-bold">{stats.processing} xe</p>
          </div>
          <button 
             onClick={onViewAll}
             className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center"
          >
            Xem báo cáo <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-slate-900">Danh mục quản lý</h3>
          <button onClick={onViewAll} className="text-blue-600 text-xs font-medium">Xem tất cả</button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Main Category */}
          <div 
            onClick={() => onCreate(CategoryType.HONDA_PT)}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between active:scale-95 transition-transform"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png" alt="Honda" className="opacity-50" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-900">Honda PT</h4>
                  <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Ổn định</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{records.filter(r => r.category === CategoryType.HONDA_PT).length} xe đang xử lý</p>
                <div className="w-48 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                   <div className="bg-blue-600 h-full w-2/3"></div>
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => onCreate(CategoryType.OLD_CAR)}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                  <Car size={20} />
                </div>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">
                  {records.filter(r => r.category === CategoryType.OLD_CAR).length}
                </span>
              </div>
              <h4 className="font-bold text-slate-900">Xe cũ</h4>
              <p className="text-xs text-gray-400">Hàng tồn kho</p>
            </div>

            <div 
              onClick={() => onCreate(CategoryType.EXTERNAL_CAR)}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-bold">New</span>
              </div>
              <h4 className="font-bold text-slate-900">Xe Ngoài</h4>
              <p className="text-xs text-gray-400">{records.filter(r => r.category === CategoryType.EXTERNAL_CAR).length} hồ sơ mới</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-slate-900 mb-4">Hoạt động gần đây</h3>
        <div className="space-y-4">
          {records.slice(0, 3).map((record, i) => (
            <div key={record.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  record.status === RecordStatus.REGISTRATION_COMPLETE ? 'bg-green-100 text-green-600' :
                  record.status === RecordStatus.PLATE_REGISTRATION ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {record.status === RecordStatus.REGISTRATION_COMPLETE ? <CheckCircle2 size={20} /> :
                   record.status === RecordStatus.PLATE_REGISTRATION ? <RefreshCcw size={20} /> :
                   <FolderPlus size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{record.status}</h4>
                  <p className="text-[10px] text-gray-500">
                    {record.plateNumber ? `Biển số ${record.plateNumber} • ` : ''} {record.vehicleType}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400">{i === 0 ? '2h trước' : i === 1 ? '5h trước' : '1d trước'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
