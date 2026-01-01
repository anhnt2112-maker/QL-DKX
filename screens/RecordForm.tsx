
import React, { useState, useRef } from 'react';
import { CategoryType, RecordStatus, VehicleRecord } from '../types';
import { X, Save, Trash2, Calendar, User, Truck, DollarSign, File, Camera, Eye, Download, UploadCloud, CheckCircle2, Image as ImageIcon } from 'lucide-react';

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
    taxImages: record?.taxImages || [],
    plateImage: record?.plateImage || '',
    registrationImage: record?.registrationImage || '',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const taxInputRef = useRef<HTMLInputElement>(null);
  const plateInputRef = useRef<HTMLInputElement>(null);
  const regInputRef = useRef<HTMLInputElement>(null);

  const profit = (formData.micaFee || 0) + (formData.serviceFee || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as VehicleRecord);
  };

  const handleNumChange = (field: keyof VehicleRecord, val: string) => {
    const num = parseInt(val.replace(/\D/g, '')) || 0;
    setFormData(prev => ({ ...prev, [field]: num }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'tax' | 'plate' | 'reg') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === 'tax') {
        setFormData(prev => ({
          ...prev,
          taxImages: prev.taxImages ? [...prev.taxImages, base64String].slice(-2) : [base64String]
        }));
      } else if (type === 'plate') {
        setFormData(prev => ({ ...prev, plateImage: base64String }));
      } else if (type === 'reg') {
        setFormData(prev => ({ ...prev, registrationImage: base64String }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
      <header className="sticky top-0 z-30 bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
        <button onClick={onCancel} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <X size={24} />
        </button>
        <h2 className="font-bold text-slate-900">Hồ sơ {category}</h2>
        <button 
           form="record-form"
           type="submit"
           className="text-blue-600 font-bold hover:bg-blue-50 px-3 py-1 rounded-lg"
        >
          Lưu
        </button>
      </header>

      {/* Image Preview Overlay */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl" />
        </div>
      )}

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
                <input 
                  type="text" 
                  value={formData.saleStaff}
                  onChange={e => setFormData(prev => ({ ...prev, saleStaff: e.target.value }))}
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="Nhập tên sale"
                />
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
          </div>
        </section>

        {/* Financial Section */}
        <section className="space-y-4">
          <h3 className="flex items-center text-slate-900 font-bold text-sm uppercase tracking-wider">
            <DollarSign size={16} className="mr-2 text-blue-600" /> Tài chính
          </h3>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <input 
                  type="text" 
                  value={formData.serviceFee?.toLocaleString('vi-VN')}
                  onChange={e => handleNumChange('serviceFee', e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none font-medium"
                />
              </div>
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
                  placeholder="Nhập doanh thu"
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
        <section className="space-y-4">
          <h3 className="flex items-center text-slate-900 font-bold text-sm uppercase tracking-wider">
            <File size={16} className="mr-2 text-blue-600" /> Hồ sơ & Chứng từ
          </h3>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            
            {/* Thuế Trước Bạ - Multiple Images */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-xs font-semibold text-gray-500">Thuế Trước Bạ (Tối đa 2)</label>
                 <span className={`text-[10px] ${formData.taxImages?.length ? 'text-green-500 font-bold' : 'text-gray-400 italic'}`}>
                   {formData.taxImages?.length ? `Đã tải ${formData.taxImages.length} ảnh` : 'Chưa có file'}
                 </span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={taxInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, 'tax')} 
                />
                <button 
                  type="button"
                  onClick={() => taxInputRef.current?.click()}
                  className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-center space-x-2 text-blue-600 font-bold text-sm"
                >
                  <UploadCloud size={18} />
                  <span>{formData.taxImages && formData.taxImages.length >= 2 ? 'Thay thế' : 'Tải lên'}</span>
                </button>
                {formData.taxImages && formData.taxImages.length > 0 && (
                  <div className="flex space-x-1">
                    {formData.taxImages.map((img, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => setPreviewImage(img)}
                        className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center"
                      >
                        <Eye size={18} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Biển Số */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-xs font-semibold text-gray-500">Biển Số</label>
                 <span className={`text-[10px] ${formData.plateImage ? 'text-green-500 font-bold' : 'text-gray-400 italic'}`}>
                   {formData.plateImage ? 'Đã tải ảnh' : 'Chưa có file'}
                 </span>
              </div>
              <div className="flex gap-2">
                 <input 
                  type="text" 
                  value={formData.plateNumber} 
                  onChange={e => setFormData(p => ({...p, plateNumber: e.target.value}))} 
                  placeholder="Số biển số" 
                  className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-slate-900 outline-none text-sm font-bold" 
                />
                <input 
                  type="file" 
                  ref={plateInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, 'plate')} 
                />
                <button 
                  type="button"
                  onClick={() => plateInputRef.current?.click()}
                  className="p-3 bg-blue-50 text-blue-600 rounded-xl"
                >
                  <Camera size={20} />
                </button>
                {formData.plateImage && (
                  <button 
                    type="button"
                    onClick={() => setPreviewImage(formData.plateImage!)}
                    className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100"
                  >
                    <Eye size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Đăng Kiểm */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-xs font-semibold text-gray-500">Đăng Kiểm</label>
                 <span className={`text-[10px] ${formData.registrationImage ? 'text-green-500 font-bold' : 'text-gray-400 italic'}`}>
                   {formData.registrationImage ? 'Đã tải ảnh' : 'Chưa có file'}
                 </span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="file" 
                  ref={regInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, 'reg')} 
                />
                <button 
                  type="button"
                  onClick={() => regInputRef.current?.click()}
                  className="flex-1 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-center space-x-2 text-blue-600 font-bold text-sm"
                >
                  <UploadCloud size={18} />
                  <span>Tải lên đăng kiểm</span>
                </button>
                {formData.registrationImage && (
                  <button 
                    type="button"
                    onClick={() => setPreviewImage(formData.registrationImage!)}
                    className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100"
                  >
                    <Eye size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

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
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-200"
        >
          <Save size={20} />
          <span>{record ? 'Cập nhật' : 'Lưu hồ sơ'}</span>
        </button>
      </div>
    </div>
  );
};
