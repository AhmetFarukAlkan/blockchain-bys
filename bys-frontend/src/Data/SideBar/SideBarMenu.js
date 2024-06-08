import { ROLE } from '../../Constants/roleConstants';

export const Menu = [
  {
    'title': 'Ana Sayfa',
    'iconName': 'house',
    'absolute_path': '/home',
    'relative_path': 'home'
  },
  {
    'title': 'Pasif Kullanıcılar',
    'iconName': 'users',
    'absolute_path': '/users',
    'relative_path': 'users',
    'permissions': [ROLE.ADMIN]
  },
  {
    'title': 'Fakülteler',
    'iconName': 'building-columns',
    'absolute_path': '/faculties',
    'relative_path': 'faculties',
    'permissions': [ROLE.ADMIN]
  },
  {
    'title': 'Bölümler',
    'iconName': 'building',
    'absolute_path': '/departments',
    'relative_path': 'departments',
    'permissions': [ROLE.ADMIN]
  },
  {
    'title': 'Aldığım Dersler',
    'iconName': 'book',
    'absolute_path': '/student/courses',
    'relative_path': 'courses',
    'permissions': [ROLE.STUDENT]
  },
  {
    'title': 'Transkript Belgem',
    'iconName': 'file',
    'absolute_path': '/student/transcript',
    'relative_path': 'transcript',
    'permissions': [ROLE.STUDENT]
  },
  {
    'title': 'Haftalık Ders Programı',
    'iconName': 'calendar',
    'absolute_path': '/student/weekly-schedule',
    'relative_path': '/student/weekly-schedule',
    'permissions': [ROLE.STUDENT]
  },
  {
    'title': 'Sınav Takvimi',
    'iconName': 'calendar-days',
    'absolute_path': '/student/exams',
    'relative_path': '/student/exams',
    'permissions': [ROLE.STUDENT]
  },
  {
    'title': 'Danışmanı Olduğum Öğrenciler',
    'iconName': 'user',
    'absolute_path': '/teacher/mentored-students',
    'relative_path': 'mentored-students',
    'permissions': [ROLE.TEACHER]
  },
  {
    'title': 'Verdiğim Dersler',
    'iconName': 'check',
    'absolute_path': '/courses/given',
    'relative_path': 'given',
    'permissions': [ROLE.TEACHER],
  },
  {
    'title': 'Verdiğim Derslerin Programı',
    'iconName': 'calendar',
    'absolute_path': '/teacher/weekly-schedule',
    'relative_path': '/teacher/weekly-schedule',
    'permissions': [ROLE.TEACHER]
  },
  {
    'title': 'Verdiğim Derslerin Sınav Takvimi',
    'iconName': 'calendar-days',
    'absolute_path': '/teacher/exams',
    'relative_path': '/teacher/exams',
    'permissions': [ROLE.TEACHER]
  },
  {
    'title': 'Ders İşlemleri',
    'iconName': 'book',
    'absolute_path': '/courses',
    'relative_path': 'courses',
    'children': [
      {
        'title': 'Ders Seçimi',
        'iconName': 'arrow-pointer',
        'absolute_path': '/courses/selection',
        'relative_path': 'selection',
        'permissions': [ROLE.STUDENT, ROLE.ADMIN],
      },
      {
        'title': 'Ders Seçimlerini Incele',
        'iconName': 'check',
        'absolute_path': '/courses/review-selections',
        'relative_path': 'review-selections',
        'permissions': [ROLE.TEACHER],
      }
    ]
  },
];
