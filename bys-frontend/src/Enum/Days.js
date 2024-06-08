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
  },
];

export function getDayKey(value, index) {
  return Days.find((item) => {
      return item.value === value;
  })?.[index];
}
