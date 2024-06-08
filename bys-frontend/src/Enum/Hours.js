export const Hours = [
  {
    label: '09:30 - 10:20',
    value: 0,
  },
  {
    label: '10:30 - 11:20',
    value: 1,
  },
  {
    label: '11:30 - 12:20',
    value: 2,
  },
  {
    label: '13.00 - 13:50',
    value: 3,
  },
  {
    label: '14.00 - 14:50',
    value: 4,
  },
  {
    label: '15.00 - 15:50',
    value: 5,
  },
  {
    label: '16.00 - 16:50',
    value: 6,
  },
  {
    label: '17.00 - 17:50',
    value: 7,
  },
  {
    label: '18.00 - 18:50',
    value: 8,
  },
  {
    label: '19.00 - 19:50',
    value: 9,
  },
];

export function getHourKey(value, index) {
  return Hours.find((item) => {
      return item.value === value;
  })?.[index];
}
