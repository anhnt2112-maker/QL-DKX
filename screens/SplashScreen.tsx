
import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  return (
    <div className="h-screen bg-[#1a1111] flex flex-col items-center justify-between py-16 px-8 text-center">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Logo */}
        <div className="w-24 h-24 bg-red-600 rounded-[28%] flex items-center justify-center shadow-2xl shadow-red-900/40">
           <div className="w-12 h-12 bg-white/20 rounded-xl blur-sm absolute"></div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Quản lý Xe</h1>
          <p className="text-gray-400 text-lg">Theo dõi đăng ký & Lợi nhuận</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center text-white text-sm">
            <CheckCircle2 size={16} className="text-red-500 mr-2" />
            Chính xác
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center text-white text-sm">
            <Zap size={16} className="text-red-500 mr-2" />
            Nhanh chóng
          </div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center text-white text-sm">
            <ShieldCheck size={16} className="text-red-500 mr-2" />
            Bảo mật
          </div>
        </div>
      </div>

      <div className="w-full space-y-6">
        <button 
          onClick={onComplete}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-3xl flex items-center justify-center space-x-2 transition-all transform active:scale-95 shadow-xl shadow-red-900/20"
        >
          <span className="text-lg">Bắt đầu ngay</span>
          <ArrowRight size={24} />
        </button>
        <p className="text-gray-400 font-medium">Tôi đã có tài khoản</p>
      </div>
    </div>
  );
};
