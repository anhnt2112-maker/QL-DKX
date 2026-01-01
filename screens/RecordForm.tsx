
import React, { useState, useEffect } from 'react';
import { CategoryType, RecordStatus, VehicleRecord } from '../types';
// Added CheckCircle2 to the imports below
import { X, Save, Trash2, Calendar, User, Truck, DollarSign, File, Camera, Eye, Download, UploadCloud, CheckCircle2 } from 'lucide-react';

interface RecordFormProps {
  category: CategoryType;
  record?: VehicleRecord;
  onSave: (record: VehicleRecord) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export const RecordForm: React.FC<RecordFormProps> = ({ category, record, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState<Partial<VehicleRecord>>({
    id: record?.id || Math.random().toString(36).substr(2, 9),
    customerName: record?.customerName || '',
    saleStaff: record?.saleStaff || '',
    receivedDate: record?.receivedDate || new Date().toISOString().split('T')[0],
    vehicleType: record?.vehicleType || '',
    category: category,
    plateNumber: record?.plateNumber || '',
    status: record?.status || RecordStatus.RECEIVED,
    step: record?.step || 1,
    micaFee: record?.micaFee || 0,
    serviceFee: record?.serviceFee || 0,
    entryCost: record?.entryCost || 0,
    withdrawalCost: record?.withdrawalCost || 0,
    expectedRevenue: record?.expectedRevenue || 0,
  });

  const profit = formData.expectedRevenue! - (
    (formData.micaFee || 0) + 
    (formData.serviceFee || 0) + 
    (formData.entryCost || 0) + 
    (formData.withdrawalCost || 0)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as VehicleRecord);
  };

  const handleNumChange = (field: keyof VehicleRecord, val: string) => {
    const num = parseInt(val.replace(/\D/g, '')) || 0;
    setFormData(prev => ({ ...prev, [field]: num }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
      <header className="sticky top-0 z-10 bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <button onClick={onCancel} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <X size={24} />
        </button>
        <h2 className="font-bold text-slate-900">Nhập liệu {category}</h2>
        <button 
           form="record-form"
           type="submit"
           className="text-blue-600 font-bold hover:bg-blue-50 px-3 py-1 rounded-lg"
        >
          Lưu
        </button>
      </header>

      <form id="record-form" onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* General Info */}
        <section className="space-y-4">
          <h3 className="flex items-center text-slate-900 font-bold text-sm uppercase tracking-wider">
            <User size={16} className="mr-2 text-blue-600" /> Thông tin chung
          </h3>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 px-1">Tên Khách Hàng</label>
              <input 
                type="text" 
                value={formData.customerName}
                onChange={e => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-100 outline-none"
                placeholder="Nhập tên khách hàng"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Ngày nhận HS</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.receivedDate}
                    onChange={e => setFormData(prev => ({ ...prev, receivedDate: e.target.value }))}
                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none appearance-none"
                  />
                  <Calendar size={18} className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Sale Phụ Trách</label>
                <select 
                  value={formData.saleStaff}
                  onChange={e => setFormData(prev => ({ ...prev, saleStaff: e.target.value }))}
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none"
                >
                  <option value="">Chọn sale</option>
                  <option value="Trần Thị B">Trần Thị B</option>
                  <option value="Lê Văn D">Lê Văn D</option>
                  <option value="Trần Tuấn Anh">Trần Tuấn Anh</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 px-1">Loại Xe</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.vehicleType}
                  onChange={e => setFormData(prev => ({ ...prev, vehicleType: e.target.value }))}
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none pr-12"
                  placeholder="Vios, Accent, Vision..."
                  required
                />
                <Truck size={18} className="absolute right-4 top-3.5 text-gray-400" />
              </div>
            </div>
            {category === CategoryType.OLD_CAR && (
               <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Biển Số</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.plateNumber}
                    onChange={e => setFormData(prev => ({ ...prev, plateNumber: e.target.value }))}
                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none pr-12 font-bold"
                    placeholder="30A-123.45"
                  />
                  <div className="absolute right-4 top-3 px-2 py-0.5 bg-yellow-400 rounded text-[10px] font-bold text-slate-900 uppercase">VN</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Financial Section */}
        <section className="space-y-4">
          <h3 className="flex items-center text-slate-900 font-bold text-sm uppercase tracking-wider">
            <DollarSign size={16} className="mr-2 text-blue-600" /> {category === CategoryType.OLD_CAR ? 'Thông tin tài chính' : 'Chi phí & Doanh thu'}
          </h3>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {category === CategoryType.OLD_CAR ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 px-1">Chi phí Rút</label>
                    <input 
                      type="text" 
                      value={formData.withdrawalCost?.toLocaleString('vi-VN')}
                      onChange={e => handleNumChange('withdrawalCost', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 px-1">Chi phí Nhập</label>
                    <input 
                      type="text" 
                      value={formData.entryCost?.toLocaleString('vi-VN')}
                      onChange={e => handleNumChange('entryCost', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 px-1">Mica</label>
                    <input 
                      type="text" 
                      value={formData.micaFee?.toLocaleString('vi-VN')}
                      onChange={e => handleNumChange('micaFee', e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 px-1">Phí Dịch Vụ</label>
                    <div className="relative">
                       <span className="absolute left-4 top-3.5 text-gray-400 text-xs font-bold">VND</span>
                       <input 
                        type="text" 
                        value={formData.serviceFee?.toLocaleString('vi-VN')}
                        onChange={e => handleNumChange('serviceFee', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-slate-900 outline-none font-medium text-right"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 px-1">Doanh Thu Dự Kiến</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-green-600 text-xs font-bold">VND</span>
                <input 
                  type="text" 
                  value={formData.expectedRevenue?.toLocaleString('vi-VN')}
                  onChange={e => handleNumChange('expectedRevenue', e.target.value)}
                  className="w-full bg-green-50 border-none rounded-2xl pl-12 pr-4 py-3 text-green-700 outline-none font-bold text-right text-lg"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
              <p className="text-gray-500 text-sm">Lợi nhuận ước tính:</p>
              <p className="text-xl font-bold text-green-600">+{profit.toLocaleString('vi-VN')} đ</p>
            </div>
          </div>
        </section>

        {/* Documents Section */}
        {category !== CategoryType.OLD_CAR && (
          <section className="space-y-4">
            <h3 className="flex items-center text-slate-900 font-bold text-sm uppercase tracking-wider">
              <File size={16} className="mr-2 text-blue-600" /> Hồ sơ & Chứng từ
            </h3>
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                   <label className="text-xs font-semibold text-gray-500">Thuế Trước Bạ</label>
                   <span className="text-[10px] text-gray-400 italic">Chưa có file</span>
                </div>
                <div className="flex gap-2">
                   <input type="text" placeholder="Nhập số biên lai thuế" className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none text-sm" />
                   <button className="p-3 bg-blue-50 text-blue-600 rounded-xl"><UploadCloud size={20} /></button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                   <label className="text-xs font-semibold text-gray-500">Biển Số</label>
                   <span className="text-[10px] text-green-500 font-bold flex items-center">
                     <CheckCircle2 size={10} className="mr-1" /> Đã tải 1 ảnh
                   </span>
                </div>
                <div className="flex gap-2">
                   <input type="text" value={formData.plateNumber} onChange={e => setFormData(p => ({...p, plateNumber: e.target.value}))} placeholder="Nhập biển số" className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none text-sm font-bold" />
                   <button className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100"><Eye size={20} /></button>
                   <button className="p-3 bg-gray-50 text-gray-400 rounded-xl"><Download size={20} /></button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                   <label className="text-xs font-semibold text-gray-500">Đăng Kiểm</label>
                   <span className="text-[10px] text-gray-400 italic">Chưa có file</span>
                </div>
                <div className="flex gap-2">
                   <input type="date" className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none text-sm" />
                   <button className="p-3 bg-blue-50 text-blue-600 border border-blue-100 border-dashed rounded-xl"><Camera size={20} /></button>
                </div>
              </div>
            </div>
          </section>
        )}

        {record && (
          <button 
            type="button"
            onClick={() => onDelete(record.id)}
            className="w-full flex items-center justify-center space-x-2 py-4 text-red-500 font-bold border border-red-100 rounded-2xl bg-red-50 active:bg-red-100 transition-colors"
          >
            <Trash2 size={20} />
            <span>Xóa hồ sơ này</span>
          </button>
        )}
      </form>

      <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-20">
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-200"
        >
          <Save size={20} />
          <span>{record ? 'Cập nhật' : 'Lưu hồ sơ'}</span>
        </button>
      </div>
    </div>
  );
};
