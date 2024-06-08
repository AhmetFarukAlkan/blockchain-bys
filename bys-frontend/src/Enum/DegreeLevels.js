export const DegreeLevel = {
  Bachelor: 'bachelor',
  Associate: 'associate',
  Master: 'master',
  Phd: 'phd',
}

export const DegreeLevels = [
  {
    label: 'Lisans',
    value: DegreeLevel.Bachelor,
  },
  {
    label: 'Önlisans',
    value: DegreeLevel.Associate,
  },
  {
    label: 'Yüksek Lisans',
    value: DegreeLevel.Master,
  },
  {
    label: 'Doktora',
    value: DegreeLevel.Phd,
  },
];

export function getDegreeLevelKey(value, index) {
  return DegreeLevels.find((item) => {
      return item.value === value;
  })?.[index];
}
