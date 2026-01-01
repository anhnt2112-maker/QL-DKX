
import React, { useState, useMemo } from 'react';
import { VehicleRecord } from '../types';
import { RecordCard } from '../components/RecordCard';
import { ArrowLeft, Search, Mic, QrCode } from 'lucide-react';

interface SearchRecordsProps {
  records: VehicleRecord[];
  onEdit: (id: string) => void;
  onBack: () => void;
}

export const SearchRecords: React.FC<SearchRecordsProps> = ({ records, onEdit, onBack }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchQuery = 
        r.customerName.toLowerCase().includes(query.toLowerCase()) || 
        r.plateNumber?.toLowerCase().includes(query.toLowerCase()) ||
        r.vehicleType.toLowerCase().includes(query.toLowerCase());
      
      const matchFilter = filter === 'All' || 
        (filter === 'Processing' && r.step < 5) || 
        (filter === 'Completed' && r.step === 5);
      
      return matchQuery && matchFilter;
    });
  }, [records, query, filter]);

  return (
    <div className="p-6">
      <header className="flex items-center space-x-4 mb-6">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-slate-900">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-bold text-xl text-slate-900 flex-1 text-center pr-10">Tra cứu hồ sơ</h2>
        <button className="text-blue-600">
          <QrCode size={24} />
        </button>
      </header>

      <div className="relative mb-6">
        <div className="absolute left-4 top-4 text-gray-400">
          <Search size={20} />
        </div>
        <input 
          type="text"
          placeholder="Tìm tên, biển số, loại xe..."
          className="w-full bg-gray-100 border-none rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-blue-100"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="absolute right-4 top-4 text-gray-400">
          <Mic size={20} />
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar mb-4">
        {['All', 'Processing', 'Completed', 'Pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            {f === 'All' ? 'Tất cả' : f === 'Processing' ? 'Đang xử lý' : f === 'Completed' ? 'Hoàn thành' : 'Chờ thuế'}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900">Kết quả tìm kiếm</h3>
        <span className="text-xs text-gray-400 font-medium">{filteredRecords.length} hồ sơ</span>
      </div>

      <div className="space-y-2">
        {filteredRecords.map(record => (
          <RecordCard 
            key={record.id} 
            record={record} 
            onClick={() => onEdit(record.id)} 
          />
        ))}
        {filteredRecords.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>Không tìm thấy hồ sơ phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
};
