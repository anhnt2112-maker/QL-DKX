
export enum CategoryType {
  HONDA_PT = 'Honda PT',
  OLD_CAR = 'Xe cũ',
  EXTERNAL_CAR = 'Xe ngoài'
}

export enum RecordStatus {
  RECEIVED = 'Hồ sơ mới tiếp nhận',
  TAX_PAYMENT = 'Đang đóng thuế',
  PLATE_REGISTRATION = 'Đang bấm biển',
  REGISTRATION_COMPLETE = 'Đăng ký hoàn tất',
  COMPLETED = 'Hoàn thành'
}

export interface VehicleRecord {
  id: string;
  customerName: string;
  saleStaff: string;
  receivedDate: string;
  vehicleType: string;
  category: CategoryType;
  plateNumber?: string;
  vin?: string;
  status: RecordStatus;
  step: number; // 1-5
  
  // Finance
  micaFee: number;
  serviceFee: number;
  entryCost?: number;
  withdrawalCost?: number;
  expectedRevenue: number;
  
  // Images (Base64 or URL)
  taxImages: string[]; // Up to 2
  plateImage?: string;
  registrationImage?: string;
}

export type Screen = 'SPLASH' | 'DASHBOARD' | 'FORM' | 'SEARCH' | 'STATS' | 'SETTINGS';
