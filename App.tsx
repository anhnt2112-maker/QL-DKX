
import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CategoryType, RecordStatus, Screen, VehicleRecord } from './types';
import { INITIAL_RECORDS } from './constants';
import { SplashScreen } from './screens/SplashScreen';
import { Dashboard } from './screens/Dashboard';
import { RecordForm } from './screens/RecordForm';
import { SearchRecords } from './screens/SearchRecords';
import { StatsScreen } from './screens/StatsScreen';

const STORAGE_KEY = 'VEHICLE_PRO_DATA';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');
  
  // Khởi tạo state từ LocalStorage hoặc dùng INITIAL_RECORDS nếu trống
  const [records, setRecords] = useState<VehicleRecord[]>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Lỗi khi tải dữ liệu từ LocalStorage", e);
        return INITIAL_RECORDS;
      }
    }
    return INITIAL_RECORDS;
  });

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  // Theo dõi sự thay đổi của records để lưu vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("Dữ liệu quá lớn (có thể do ảnh), không thể lưu vào LocalStorage toàn bộ.", e);
      // Có thể triển khai IndexedDB ở đây nếu cần lưu trữ ảnh dung lượng cao hơn
    }
  }, [records]);

  const selectedRecord = useMemo(() => 
    records.find(r => r.id === selectedRecordId), 
    [records, selectedRecordId]
  );

  const handleCreateRecord = (category: CategoryType) => {
    setSelectedCategory(category);
    setSelectedRecordId(null);
    setCurrentScreen('FORM');
  };

  const handleEditRecord = (id: string) => {
    const record = records.find(r => r.id === id);
    if (record) {
      setSelectedRecordId(id);
      setSelectedCategory(record.category);
      setCurrentScreen('FORM');
    }
  };

  const handleSaveRecord = (record: VehicleRecord) => {
    setRecords(prev => {
      const exists = prev.find(r => r.id === record.id);
      if (exists) {
        return prev.map(r => r.id === record.id ? record : r);
      }
      return [record, ...prev];
    });
    setCurrentScreen('DASHBOARD');
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hồ sơ này?")) {
      setRecords(prev => prev.filter(r => r.id !== id));
      setCurrentScreen('DASHBOARD');
    }
  };

  // Screen Rendering
  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH':
        return <SplashScreen onComplete={() => setCurrentScreen('DASHBOARD')} />;
      case 'DASHBOARD':
        return (
          <Dashboard 
            records={records} 
            onCreate={handleCreateRecord} 
            onViewAll={() => setCurrentScreen('SEARCH')}
          />
        );
      case 'FORM':
        return (
          <RecordForm 
            category={selectedCategory || CategoryType.HONDA_PT} 
            record={selectedRecord} 
            onSave={handleSaveRecord}
            onCancel={() => setCurrentScreen('DASHBOARD')}
            onDelete={handleDeleteRecord}
          />
        );
      case 'SEARCH':
        return (
          <SearchRecords 
            records={records} 
            onEdit={handleEditRecord} 
            onBack={() => setCurrentScreen('DASHBOARD')}
          />
        );
      case 'STATS':
        return <StatsScreen records={records} onBack={() => setCurrentScreen('DASHBOARD')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <h1 className="text-xl font-bold">Tính năng đang phát triển</h1>
            <button onClick={() => setCurrentScreen('DASHBOARD')} className="mt-4 text-blue-600 underline">Quay lại</button>
          </div>
        );
    }
  };

  return (
    <Layout 
      activeScreen={currentScreen} 
      onNavigate={setCurrentScreen} 
      hideNav={currentScreen === 'SPLASH' || currentScreen === 'FORM'}
    >
      {renderScreen()}
    </Layout>
  );
}
