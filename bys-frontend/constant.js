import moment from 'moment';

export const Days = [
  {
    label: 'Pazartesi',
    value: 1,
  },
  {
    label: 'Salı',
    value: 2,
  },
  {
    label: 'Çarşamba',
    value: 3,
  },
  {
    label: 'Perşembe',
    value: 4,
  },
  {
    label: 'Cuma',
    value: 5,
  },
  {
    label: 'Cumartesi',
    value: 6,
  },
  {
    label: 'Pazar',
    value: 7,
  }
];

export const dateRangeLocal = {
  'format': 'DD/MM/YYYY',
  'separator': ' - ',
  'applyLabel': 'Uygula',
  'cancelLabel': 'Vazgeç',
  'fromLabel': 'Dan',
  'toLabel': 'a',
  'customRangeLabel': 'Seç',
  'daysOfWeek': [
    'Pt',
    'Sl',
    'Çr',
    'Pr',
    'Cm',
    'Ct',
    'Pz'
  ],
  'monthNames': [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık'
  ],
  'firstDay': 1
};

export const dateRanges = {
  'Bugün': [moment(), moment()],
  'Dün': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Son 7 Gün': [moment().subtract(6, 'days'), moment()],
  'Son 30 Gün': [moment().subtract(29, 'days'), moment()],
  'Bu Ay': [moment().startOf('month'), moment().endOf('month')],
  'Geçen Ay': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
};

export const dateRangeInitialSettings = {
  maxSpan: {'days': 365},
  locale: dateRangeLocal,
  ranges: dateRanges,
  alwaysShowCalendars: true,
  showCustomRangeLabel: false,
  autoUpdateInput: false
};

export const dateFormat = 'DD.MM.YYYY HH:mm';
