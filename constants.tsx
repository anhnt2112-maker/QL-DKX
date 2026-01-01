
import React from 'react';
import { CategoryType, RecordStatus, VehicleRecord } from './types';
import { CheckCircle, Clock, FileText, Search, Home, BarChart3, Settings, Calendar } from 'lucide-react';

export const INITIAL_RECORDS: VehicleRecord[] = [
  {
    id: '1',
    customerName: 'Nguyễn Văn A',
    saleStaff: 'Trần Thị B',
    receivedDate: '2023-10-25',
    vehicleType: 'Honda Vision',
    category: CategoryType.HONDA_PT,
    plateNumber: '30H-123.45',
    status: RecordStatus.REGISTRATION_COMPLETE,
    step: 4,
    micaFee: 50000,
    serviceFee: 500000,
    expectedRevenue: 1200000,
    // Fix: Added missing required property 'taxImages'
    taxImages: [],
  },
  {
    id: '2',
    customerName: 'Trần Văn C',
    saleStaff: 'Lê Văn D',
    receivedDate: '2023-10-26',
    vehicleType: 'Toyota Vios',
    category: CategoryType.EXTERNAL_CAR,
    plateNumber: '29A-999.99',
    status: RecordStatus.PLATE_REGISTRATION,
    step: 3,
    micaFee: 50000,
    serviceFee: 1000000,
    expectedRevenue: 2500000,
    // Fix: Added missing required property 'taxImages'
    taxImages: [],
  },
  {
    id: '3',
    customerName: 'Phạm Thị E',
    saleStaff: 'Trần Tuấn Anh',
    receivedDate: '2023-10-24',
    vehicleType: 'Mazda 3 2019',
    category: CategoryType.OLD_CAR,
    plateNumber: '30G-567.89',
    status: RecordStatus.RECEIVED,
    step: 1,
    micaFee: 0,
    serviceFee: 0,
    entryCost: 450000000,
    withdrawalCost: 5000000,
    expectedRevenue: 475000000,
    // Fix: Added missing required property 'taxImages'
    taxImages: [],
  }
];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Trang chủ', icon: Home },
  { id: 'SEARCH', label: 'Tra cứu', icon: Search },
  { id: 'STATS', label: 'Báo cáo', icon: BarChart3 },
  { id: 'SETTINGS', label: 'Cài đặt', icon: Settings },
];
