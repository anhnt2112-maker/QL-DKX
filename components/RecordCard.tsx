
import React from 'react';
import { VehicleRecord, RecordStatus } from '../types';
import { ChevronRight, TrendingUp } from 'lucide-react';

interface RecordCardProps {
  record: VehicleRecord;
  onClick: () => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, onClick }) => {
  const getStatusColor = (status: RecordStatus) => {
    switch (status) {
      case RecordStatus.COMPLETED:
      case RecordStatus.REGISTRATION_COMPLETE:
        return 'bg-green-100 text-green-700';
      case RecordStatus.RECEIVED:
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const profit = record.expectedRevenue - (record.micaFee + record.serviceFee + (record.entryCost || 0) + (record.withdrawalCost || 0));

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm active:scale-95 transition-transform"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[11px] font-semibold px-2 py-1 rounded-md ${getStatusColor(record.status)}`}>
          {record.status} - Bước {record.step}/5
        </span>
        <span className="text-gray-400 text-xs">2 giờ trước</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{record.plateNumber || 'Chưa có biển'}</h3>
          <p className="text-sm text-gray-600">{record.customerName}</p>
          <p className="text-xs text-gray-400 mt-1">{record.vehicleType} | VIN: ...{record.vin?.slice(-4) || '8392'}</p>
        </div>
        <button className="p-2 bg-gray-50 rounded-full text-gray-400">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 flex items-center text-green-600 font-bold">
        <TrendingUp size={16} className="mr-1" />
        {profit.toLocaleString('vi-VN')}đ
      </div>
      
      <div className="mt-4 overflow-hidden rounded-xl bg-gray-100 h-32 relative">
        <img 
          src={`https://picsum.photos/seed/${record.id}/400/200`} 
          alt="Vehicle" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
