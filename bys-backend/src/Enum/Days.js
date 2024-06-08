const Days = [
  {
    label: 'Pazartesi',
    value: 1,
    key: 'monday'
  },
  {
    label: 'Salı',
    value: 2,
    key: 'tuesday'
  },
  {
    label: 'Çarşamba',
    value: 3,
    key: 'wednesday'
  },
  {
    label: 'Perşembe',
    value: 4,
    key: 'thursday'
  },
  {
    label: 'Cuma',
    value: 5,
    key: 'friday'
  },
  {
    label: 'Cumartesi',
    value: 6,
    key: 'saturday'
  },
  {
    label: 'Pazar',
    value: 7,
    key: 'sunday'
  },
];

function getDayKey(value, index) {
  return Days.find((item) => {
      return item.value === value;
  })?.[index];
}

module.exports = {
  Days,
  getDayKey,
};
