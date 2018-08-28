import store from "./StoreService";

const enStringTable = {
  topPanel: {
    title: "Fleet Management System",
  },
  accountMenu: {
    fleetManagement: "Fleet Management",
    appSettings: "Application Settings",
    signOut: "Sign out",
  },
  sidePanel: {
    groupsTab: "Groups",
    legendTab: "Map Legend",
  },
  vehicleDisplay: {
    overviewTab: "Overview",
    notificationsTab: "Notifications",
    historyTab: "History",
    quickReportsTab: "Quick Reports",
    vehicleConfigTab: "Configuration",
    noSelectedVehicle: "No selected vehicle",
  },
  geocoding: {
    near: "Around {0}",
  },
  api: {
    httpError: "Server error",
    httpErrorDesc: "Server responded with this error:",
    commError: "Server communication error",
    commErrorDesc: "Failed to connect server",
    unexpectedDataFormat: "Received data is in an unexpected format",
  },
  fleetConfig: {
    title: "Fleet Configuration",
    vehicles: "Vehicles",
    vehicleGroups: "Vehicle Groups",
    drivers: "Drivers",
    buildingsAreas: "Buildings/Areas",
    routes: "Routes",
    addVehicle: "Add Vehicle",
    addVehicleTitle: "Add Vehicle",
    editVehicleTitle: "Edit Vehicle",
  },
  dataGrid: {
    pageSize: "Page size",
  },
  signIn: {
    title: "Sign in to your account",
    username: "User name",
    password: "Password",
    signIn: "Sign In",
    credentialsInvalid: "Your credentials are invalid",
  },
  vehicleHistory: {
    vehicleHistoryPlayback: "Vehicle history playback",
    packageType: "Package Type",

  },
  vehicleNotifications: {
    keyOn: "Vehicle key on",
    keyOff: "Vehicle key off",
    startedToMove: "Vehicle started to move",
    stopped: "Vehicle stopped",
    gpsLost: "No GPS connection",
    gpsReconnected: "GPS reconnected",
    speedLimitViolated: "Speed limit violated",
    endOfSpeedLimitViolation: "End of speed limit violation",
  },
  quickReports: {
    overview: "Overview",
    engineTemp: "Engine Temperature Histogram",
    driverEvaluation: "Driver Evaluation",
    engineSpeedTorqueResidencyMap: "Engine Speed-Torque Residency Map",
    speedLimitViolationTimeline: "Speed Limit Violation Timeline",
    pointDistribution: "Point Distribution",
    acceleration: "Acceleration",
    cruising: "Cruising",
    braking: "Braking",
    anticipation: "Anticipation",
    numberOfNotifications: "Number of notifications",
    numberOfSpeedLimitViolations: "Number of speed limit violations",
    cruise: "Cruise",
    idling: "Idling",
    keyOff: "Key off",
  },
  time: {
    weekAbbr: "wk",
    monthAbbr: "mth",
  },
  applicationSettings: {
    title: "Application Settings",
    appLang: "Application language",
  },
  global: {
    altitude: "Altitude",
    cancel: "Cancel",
    date: "Date",
    delete: "Delete",
    driver: "Driver",
    edit: "Edit",
    fleet: "Fleet",
    kph: "kph",
    lastComm: "Last communication",
    latitude: "Latitude",
    loading: "Loading",
    localeString: "en",
    location: "Konum",
    longitude: "Longitude",
    moduleId: "Module ID",
    plate: "Plate",
    save: "Save",
    speed: "Speed",
    time: "Time",
    vehicle: "Vehicle",
  },
};

const trStringTable = {
  topPanel: {
    title: "Filo Takip Sistemi",
  },
  accountMenu: {
    fleetManagement: "Filo Yönetimi",
    appSettings: "Uygulama Ayarları",
    signOut: "Çıkış",
  },
  sidePanel: {
    groupsTab: "Gruplar",
    legendTab: "Harita Anahtarı",
  },
  vehicleDisplay: {
    overviewTab: "Genel Bakış",
    notificationsTab: "Bildirimler",
    historyTab: "Geçmiş",
    quickReportsTab: "Hızlı Raporlar",
    vehicleConfigTab: "Ayarlar",
    noSelectedVehicle: "Seçili araç yok",
  },
  geocoding: {
    near: "{0} civarında",
  },
  api: {
    httpError: "Sunucu hatası",
    httpErrorDesc: "Sunucu aşağıdaki hatayı verdi:",
    commError: "Sunucu iletişim hatası",
    commErrorDesc: "Sunucuya bağlanılamadı",
    unexpectedDataFormat: "Sunucudan gelen veri beklenmeyen bir formatta",
  },
  fleetConfig: {
    title: "Filo Yönetimi",
    vehicles: "Araçlar",
    vehicleGroups: "Araç Grupları",
    drivers: "Sürücüler",
    buildingsAreas: "Binalar/Bölgeler",
    routes: "Rotalar",
    addVehicle: "Araç Ekle",
    addVehicleTitle: "Araç Ekleme",
    editVehicleTitle: "Araç Düzenleme",
  },
  dataGrid: {
    pageSize: "Sayfa boyutu",
  },
  signIn: {
    title: "Hesabınıza giriş yapın",
    username: "Kullanıcı adı",
    password: "Şifre",
    signIn: "Giriş",
    credentialsInvalid: "Girdiğiniz hesap bilgileri hatalı",
  },
  vehicleHistory: {
    vehicleHistoryPlayback: "Araç geçmişini tekrar oynat",
    packageType: "Paket Tipi",
  },
  vehicleNotifications: {
    keyOn: "Kontak açıldı",
    keyOff: "Kontak kapandı",
    startedToMove: "Araç harekete geçti",
    stopped: "Araç durdu",
    gpsLost: "GPS bağlantısı kesildi",
    gpsReconnected: "GPS bağlantısı tekrar sağlandı",
    speedLimitViolated: "Hız limiti aşıldı",
    endOfSpeedLimitViolation: "Hız limiti aşımı sona erdi",
  },
  quickReports: {
    overview: "Genel Bakış",
    engineTemp: "Motor Suyu Sıcaklığı",
    driverEvaluation: "Sürücü Değerlendirmesi",
    engineSpeedTorqueResidencyMap: "Motor Hızı-Tork Dağılım Haritası",
    speedLimitViolationTimeline: "Hız Limiti Aşımı Zaman Serisi",
    pointDistribution: "Puan dağılımı",
    acceleration: "Hızlanma",
    cruising: "Sürüş",
    braking: "Frenleme",
    anticipation: "Öngörü",
    numberOfNotifications: "Bildirim sayısı",
    numberOfSpeedLimitViolations: "Hız limiti aşım sayısı",
    cruise: "Sürüş",
    idling: "Rölanti",
    keyOff: "Kontak kapalı",
  },
  time: {
    weekAbbr: "haf",
    monthAbbr: "ay",
  },
  applicationSettings: {
    title: "Uygulama Ayarları",
    appLang: "Uygulama dili",
  },
  global: {
    altitude: "Yükseklik",
    cancel: "İptal",
    date: "Tarih",
    delete: "Sil",
    driver: "Sürücü",
    edit: "Düzenle",
    fleet: "Filo",
    kph: "km/s",
    lastComm: "Son veri",
    latitude: "Enlem",
    loading: "Yükleniyor",
    localeString: "tr",
    location: "Konum",
    longitude: "Boylam",
    moduleId: "Modül ID",
    plate: "Plaka",
    save: "Kaydet",
    speed: "Hız",
    time: "Saat",
    vehicle: "Araç",
  },
};

export default class LocalizationService {
    _scope = null;
    constructor(scope) {
      this._scope = scope;
    }
    string(str, scope) {
      const l = store.getState().app.language;
      const s = scope || this._scope;
      return LocalizationService.stringTable[l][s][str] ||
             LocalizationService.stringTable[l].global[str];
    }
    localeString() {
      return LocalizationService.stringTable[store.getState().app.language].global.localeString;
    }
    stringUppercase(str, scope) {
      const localeString = LocalizationService.langToLocaleString(store.getState().app.language);
      return this.string(str, scope).toLocaleUpperCase(localeString);
    }
    static stringTable = {
      en: enStringTable,
      tr: trStringTable,
    }
    static langToLocaleString = (str) => {
      const mapping = {
        tr: "TR",
        en: "en-US",
      };
      return mapping[str];
    }
}

