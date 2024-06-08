// refactoreController.js

const { accountAddress } = require("../Constants/contractConstants.js");
const UserContract = require("../Blockchain/Contracts/User/UserContract.js");
const CourseContract = require("../Blockchain/Contracts/Course/CourseContract.js");
const DepartmentContract = require("../Blockchain/Contracts/Department/DepartmentContract.js");
const FacultyContract = require("../Blockchain/Contracts/Faculty/FacultyContract.js");
const OpenedCourseContract = require("../Blockchain/Contracts/Course/OpenedCourseContract.js");
const StudentCourseInfoContract = require("../Blockchain/Contracts/CourseStudent/StudentCourseInfoContract.js");
const SenderCheckerContract = require("../Blockchain/Contracts/SenderChecker/SenderCheckerContract.js");
const { encrypt, delay } = require("../Utils/utils.js");

const Users = [
  {
    name: "Ayşe",
    surname: "Yılmaz",
    number: "170420044",
    password: "123456",
    mail: "ayse.yilmaz@gmail.com",
    phone: "+905555555555",
    roles: ["Student"],
    isActive: true,
  },
  {
    name: "Mehmet",
    surname: "Kaya",
    number: "170420022",
    password: "123456",
    mail: "mehmet.kaya@gmail.com",
    phone: "+905071234567",
    roles: ["Student"],
    isActive: true,
  },
  {
    name: "Engin",
    surname: "Kurt",
    number: "170420037",
    password: "enginkurt@gmail.com",
    mail: "enginkurt@gmail.com",
    phone: "5435466545",
    roles: ["Teacher"],
    isActive: true,
  },
  {
    name: "Ahmet Faruk",
    surname: "Alkan",
    number: "170420044",
    password: "farukalkan@marun.edu.tr",
    mail: "farukalkan@marun.edu.tr",
    phone: "5435466545",
    roles: ["Admin"],
    isActive: true,
  },
  {
    name: "Kasım Selimhan",
    surname: "Baltaş",
    number: "170420016",
    password: "selimhan.baltas@marun.edu.tr",
    mail: "selimhan.baltas@marun.edu.tr",
    phone: "5435466545",
    roles: ["Admin"],
    isActive: true,
  },
  {
    name: "Eyüp Emre",
    surname: "Ülkü",
    number: "",
    password: "emre.ulku@marmara.edu.tr",
    mail: "emre.ulku@marmara.edu.tr",
    phone: "5435466545",
    roles: ["Teacher"],
    isActive: true,
  },
  {
    name: "Eren",
    surname: "Demir",
    number: "010124001",
    password: "eren.demir@gmail.com",
    mail: "eren.demir@gmail.com",
    phone: "+905071234567",
    roles: ["Student"],
    isActive: true,
  },
  {
    name: "Ali",
    surname: "Yılmaz",
    number: "",
    password: "ali.yilmaz@gmail.com",
    mail: "ali.yilmaz@gmail.com",
    phone: "+905071234568",
    roles: [],
    isActive: false,
  },
  {
    name: "Ayşe",
    surname: "Kara",
    number: "",
    password: "ayse.kara@gmail.com",
    mail: "ayse.kara@gmail.com",
    phone: "+905071234569",
    roles: [],
    isActive: false,
  },
  {
    name: "Mehmet",
    surname: "Öztürk",
    number: "",
    password: "mehmet.ozturk@gmail.com",
    mail: "mehmet.ozturk@gmail.com",
    phone: "+905071234570",
    roles: [],
    isActive: false,
  },
  {
    name: "Fatma",
    surname: "Çelik",
    number: "",
    password: "fatma.celik@gmail.com",
    mail: "fatma.celik@gmail.com",
    phone: "+905071234571",
    roles: [],
    isActive: false,
  },
  {
    name: "Emre",
    surname: "Aksoy",
    number: "",
    password: "emre.aksoy@gmail.com",
    mail: "emre.aksoy@gmail.com",
    phone: "+905071234572",
    roles: [],
    isActive: false,
  },
  {
    name: "Zeynep",
    surname: "Kaya",
    number: "",
    password: "zeynep.kaya@gmail.com",
    mail: "zeynep.kaya@gmail.com",
    phone: "+905071234573",
    roles: [],
    isActive: false,
  },
  {
    name: "Ahmet",
    surname: "Şahin",
    number: "",
    password: "ahmet.sahin@gmail.com",
    mail: "ahmet.sahin@gmail.com",
    phone: "+905071234574",
    roles: [],
    isActive: false,
  },
  {
    name: "Elif",
    surname: "Duman",
    number: "",
    password: "elif.duman@gmail.com",
    mail: "elif.duman@gmail.com",
    phone: "+905071234575",
    roles: [],
    isActive: false,
  },
  {
    name: "Can",
    surname: "Arslan",
    number: "",
    password: "can.arslan@gmail.com",
    mail: "can.arslan@gmail.com",
    phone: "+905071234576",
    roles: [],
    isActive: false,
  },
  {
    name: "Derya",
    surname: "Demirci",
    number: "",
    password: "derya.demirci@gmail.com",
    mail: "derya.demirci@gmail.com",
    phone: "+905071234577",
    roles: [],
    isActive: false,
  },
];

async function addUsers() {
  try {
    await Promise.all(
      Users.map(async (user) => {
        await delay(500);
        await UserContract.methods
          .addUser(
            encrypt(user.name),
            encrypt(user.surname),
            user.number && encrypt(user.number),
            encrypt(user.password),
            encrypt(user.mail),
            encrypt(user.phone),
            user.roles,
            user.isActive
          )
          .send({ from: accountAddress, gas: 800000 });
      })
    );

    await delay(1000);
    console.log("Kullanıcılar başarıyla eklendi");
  } catch (error) {
    console.error("Kullanıcı kişisel bilgileri yazarken hata oluştu:", error);
  }
}

async function addUserDepartments() {
  try {
    await UserContract.methods
      .addUserDepartment(1, 1, "Student", 1)
      .send({ from: accountAddress, gas: 800000 });
    await delay(500);
    await UserContract.methods
      .addUserDepartment(2, 1, "Student", 1)
      .send({ from: accountAddress, gas: 800000 });
    await delay(500);
    await UserContract.methods
      .addUserDepartment(3, 1, "Teacher", 1)
      .send({ from: accountAddress, gas: 800000 });
    await delay(500);
    await UserContract.methods
      .addUserDepartment(6, 1, "Teacher", 1)
      .send({ from: accountAddress, gas: 800000 });
    await delay(500);
    await UserContract.methods
      .addUserDepartment(7, 1, "Student", 1)
      .send({ from: accountAddress, gas: 800000 });
    await delay(1000);

    console.log("Kullanıcıların departman kaydı başarıyla eklendi");
  } catch (error) {
    console.error(
      "Kullanıcıların departman kaydı bilgileri yazarken hata oluştu:",
      error
    );
  }
}

async function addAdvisorStudentRelationship() {
  try {
    await UserContract.methods
      .addAdvisorStudentRelationship(6, [1, 2, 7], 1)
      .send({ from: accountAddress, gas: 800000 });

    console.log("Öğrenci advisor bilgileri başarıyla eklendi");
  } catch (error) {
    console.error("Öğrenci advisor bilgileri yazarken hata oluştu:", error);
  }
}

const Courses = [
  {
    name: "Bilgisayar Mühendisliğine Giriş",
    code: "BMG101",
    departmentId: 1,
    capacity: 50,
    credit: 3,
  },
  {
    name: "Nesne Yönelimli Programlama",
    code: "NYNMP202",
    departmentId: 1,
    capacity: 100,
    credit: 5,
  },
  {
    name: "Diferansiyel Denklemler",
    code: "DFDNK330",
    departmentId: 2,
    capacity: 75,
    credit: 6,
  },
  {
    name: "Bilgisayar Donanımı",
    code: "BLM1004",
    departmentId: 1,
    capacity: 75,
    credit: 6,
  },
  {
    name: "Fizik I",
    code: "FZK1071",
    departmentId: 1,
    capacity: 75,
    credit: 4,
  },
  {
    name: "Matematik I",
    code: "MAT1085",
    departmentId: 1,
    capacity: 75,
    credit: 5,
  },
  {
    name: "Algoritma ve Programlamaya Giriş ",
    code: "BLM1003",
    departmentId: 1,
    capacity: 75,
    credit: 4,
  },

  {
    name: "Bilgisayar Programlama I",
    code: "BLM1002",
    departmentId: 1,
    capacity: 75,
    credit: 6,
  },
  {
    name: "Fizik II",
    code: "FZK1072",
    departmentId: 1,
    capacity: 75,
    credit: 4,
  },
  {
    name: "Matematik II",
    code: "MAT1086",
    departmentId: 1,
    capacity: 75,
    credit: 5,
  },
  {
    name: "İş Sağlığı ve Güvenliği",
    code: "ISG1081",
    departmentId: 1,
    capacity: 75,
    credit: 3,
  },
  {
    name: "Bilgisayar Programlama II",
    code: "BLM2001",
    departmentId: 1,
    capacity: 75,
    credit: 7,
  },
  {
    name: "İnsan-Bilgisayar Etkileşimi ve Görsellik",
    code: "BLM2003",
    departmentId: 1,
    capacity: 75,
    credit: 4,
  },
  {
    name: "Mantık Devreleri",
    code: "BLM2007",
    departmentId: 1,
    capacity: 85,
    credit: 4,
  },
  {
    name: "Ayrık Matematik",
    code: "MAT2019",
    departmentId: 1,
    capacity: 40,
    credit: 3,
  },
  {
    name: "Veri Yapıları ve Algoritmalar",
    code: "BLM2002",
    departmentId: 1,
    capacity: 85,
    credit: 5,
  },
];

async function addCourse() {
  try {
    await Promise.all(
      Courses.map(async (course) => {
        await delay(500);
        await CourseContract.methods
          .addCourse(
            course.name,
            course.code,
            course.departmentId,
            course.capacity,
            course.credit
          )
          .send({ from: accountAddress, gas: 800000 });
      })
    );

    console.log("Sınıflar başarıyla eklendi");
  } catch (error) {
    console.error("Kurs bilgileri yazarken hata oluştu:", error);
  }
}

const OpenedCourses = [
  {
    courseId: 1,
    schedules: '[{"day":5,"hours":3},{"day":4,"hours":4}]',
    year: 2024,
    semester: 2,
    gradingRules:
      '{"aa":90,"ba":85,"bb":80,"cb":75,"cc":65,"dc":60,"dd":55,"fd":50,"ff":0}',
    location: "T2 123",
  },
  {
    courseId: 2,
    schedules: '[{"day":2,"hours":2}]',
    year: 2024,
    semester: 2,
    gradingRules:
      '{"aa":90,"ba":85,"bb":80,"cb":75,"cc":65,"dc":60,"dd":55,"fd":50,"ff":0}',
    location: "T2 Z03",
  },
  {
    courseId: 3,
    schedules: '[{"day":1,"hours":2},{"day":2,"hours":3}]',
    year: 2024,
    semester: 2,
    gradingRules:
      '{"aa":90,"ba":85,"bb":80,"cb":75,"cc":65,"dc":60,"dd":55,"fd":50,"ff":0}',
    location: "T2 Z02",
  },
];

async function addOpenedCourse() {
  try {
    await Promise.all(
      OpenedCourses.map(async (course) => {
        await OpenedCourseContract.methods
          .addOpenedCourse(
            course.courseId,
            course.schedules,
            course.year,
            course.semester,
            course.gradingRules,
            course.location
          )
          .send({ from: accountAddress, gas: 800000 });
      })
    );

    console.log("Açılan sınıflar başarıyla eklendi");
  } catch (error) {
    console.error("Açılan kurs bilgileri yazarken hata oluştu:", error);
  }
}

const StudentCourseInfos = [
  {
    openedCourseId: 2,
    userId: 1,
  },
  {
    openedCourseId: 3,
    userId: 1,
  },
  {
    openedCourseId: 1,
    userId: 2,
  },
  {
    openedCourseId: 2,
    userId: 2,
  },
];

async function addStudentCourseInfo() {
  try {
    await Promise.all(
      StudentCourseInfos.map(async (info) => {
        await StudentCourseInfoContract.methods
          .addStudentCourseInfo(info.openedCourseId, info.userId)
          .send({ from: accountAddress, gas: 800000 });
      })
    );

    StudentCourseInfoContract.methods
      .updateStudentCourseInfosStatus(3, 1, "approved")
      .send({ from: accountAddress, gas: 800000 });

    console.log("Öğrencinin ders bilgilerin başarıyla eklendi");
  } catch (error) {
    console.error("Öğrencinin ders bilgilerini yazarken hata oluştu:", error);
  }
}

const Departments = [
  {
    name: "Bilgisayar Mühendisliği",
    faculty_id: 1,
    email: "bilgisayar.teknoloji@marmara.edu.tr",
    phone_number: "90 216 777 4000",
    location:
      "Marmara Üniversitesi Recep Tayyip Erdoğan külliyesi T4 Binası Bilgisayar Mühendisliği Aydınevler Mah. Uyanık C. No.6 34840 Maltepe/ İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Makine Mühendisliği",
    faculty_id: 1,
    email: "makine.teknoloji@marmara.edu.tr",
    phone_number: "90 216 777 4000",
    location:
      "Marmara Üniversitesi, Teknoloji Fakültesi, Makine Mühendisliği Bölümü, Recep Tayyip Erdoğan Külliyesi T3 Binası Aydınevler Mah. İdealtepe Yolu No:15 34840 Maltepe/ İSTANBUL, TÜRKİYE",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Tekstil Mühendisliği",
    faculty_id: 1,
    email: "tekstil.teknoloji@marmara.edu.tr",
    phone_number: "90 216 777 3961",
    location:
      "Marmara Üniversitesi, Teknoloji Fakültesi, Makine Mühendisliği Bölümü, Recep Tayyip Erdoğan Külliyesi T3 Binası Aydınevler Mah. İdealtepe Yolu No:15 34840 Maltepe/ İSTANBUL, TÜRKİYE",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Mekatronik Mühendisliği",
    faculty_id: 1,
    email: "mekatronik.teknoloji@marmara.edu.tr",
    phone_number: "90 216 777 3900",
    location:
      "Marmara Üniversitesi, Teknoloji Fakültesi, Makine Mühendisliği Bölümü, Recep Tayyip Erdoğan Külliyesi T3 Binası Aydınevler Mah. İdealtepe Yolu No:15 34840 Maltepe/ İSTANBUL, TÜRKİYE",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Bilgisayar Mühendisliği",
    faculty_id: 2,
    email: "haluk@marmara.edu.tr",
    phone_number: "90 0216 777 35 37",
    location:
      "Marmara Üniversitesi Mühendislik Fakültesi Bilgisayar Mühendisliği Bölümü Recep Tayyip Erdoğan Külliyesi Maltepe Yerleşkesi Aydınevler Mah. 34840 Maltepe/ İstanbul TÜRKİYE",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Anatomi",
    faculty_id: 3,
    email: "anatomi@marmara.edu.tr",
    phone_number: "90 0216 777 35 47",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Biyofizik",
    faculty_id: 3,
    email: "biyofizik@marmara.edu.tr",
    phone_number: "90 0216 777 35 39",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Tıbbi Biyoloji",
    faculty_id: 3,
    email: "tibbibiyoloji@marmara.edu.tr",
    phone_number: "90 0216 777 25 37",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Fizyoloji",
    faculty_id: 3,
    email: "fizyoloji@marmara.edu.tr",
    phone_number: "90 0216 777 55 37",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Dermatoloji",
    faculty_id: 3,
    email: "dermatoloji@marmara.edu.tr",
    phone_number: "90 0216 777 35 87",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Göğüs Hastalıkları",
    faculty_id: 3,
    email: "gogus_hastaliklari@marmara.edu.tr",
    phone_number: "90 0216 777 35 17",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },

  {
    name: "İşletme",
    faculty_id: 4,
    email: "isletme@marmara.edu.tr",
    phone_number: "90 0216 777 35 37",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
  {
    name: "Yönetim Bilişim Sistemleri",
    faculty_id: 4,
    email: "yonetim_bilisim@marmara.edu.tr",
    phone_number: "90 0216 777 35 39",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
    degreeLevel: "bachelor",
    walletAddress: accountAddress,
  },
];

async function addDepartment() {
  try {
    await Promise.all(
      Departments.map(async (department) => {
        await delay(500);
        await DepartmentContract.methods
          .addDepartment(
            department.name,
            department.faculty_id,
            department.email,
            department.phone_number,
            department.location,
            department.degreeLevel,
            department.walletAddress
          )
          .send({ from: accountAddress, gas: 500000 });

        await SenderCheckerContract.methods
          .addAllowedSender(department.walletAddress)
          .send({ from: accountAddress, gas: 500000 });
      })
    );

    console.log("Bölümler başarıyla eklendi");
  } catch (error) {
    console.error("Bölüm bilgileri yazarken hata oluştu:", error);
  }
}

const Faculties = [
  {
    name: "Teknoloji",
    email: "teknoloji@marmara.edu.tr",
    phone_number: "90 216 777 4000",
    location:
      "Marmara Üniversitesi Recep Tayyip Erdoğan Külliyesi Maltepe Yerleşkesi Aydınevler Mah. İdealtepe Yolu No:15 34854 Maltepe/İstanbul",
  },
  {
    name: "Mühendislik",
    email: "muhendislik@marmara.edu.tr",
    phone_number: "90 216 777 3528",
    location:
      "Marmara Üniversitesi Recep Tayyip Erdoğan Külliyesi Aydınevler Mah. 34854 Maltepe/ İstanbul",
  },
  {
    name: "Tıp",
    email: "tip.bilgi@marmara.edu.tr",
    phone_number: "90 216 777 55 01",
    location:
      " Marmara Universitesi Tıp Fakültesi Başıbüyük Mah. Maltepe Başıbüyük Yolu Sok. No:9/2 Maltepe - İstanbul / 34854",
  },
  {
    name: "İşletme",
    email: "isletmefakultesi.sekreter@marmara.edu.tr",
    phone_number: "90 216 777 24 00",
    location:
      "Eğitim Mh. Fahrettin Kerim Gökay Cd. MÜ Göztepe Kampüsü, Göztepe, Kadıköy, İstanbul",
  },
  {
    name: "Hukuk",
    email: "hukukogrenciisleri@marmara.edu.tr",
    phone_number: "90 216 777 22 18",
    location:
      "Marmara Üniversitesi Hukuk Fakültesi Göztepe Yerleşkesi B.Blok 118/2 34722 Kadıköy/İSTANBUL",
  },
];

async function addFaculty() {
  try {
    await Promise.all(
      Faculties.map(async (faculty) => {
        await FacultyContract.methods
          .addFaculty(
            faculty.name,
            faculty.email,
            faculty.phone_number,
            faculty.location
          )
          .send({ from: accountAddress, gas: 500000 });
      })
    );

    console.log("Fakülteler başarıyla eklendi");
  } catch (error) {
    console.error("Fakülte bilgileri yazarken hata oluştu:", error);
  }
}

async function addTempRecords() {
  try {
    await addUsers();
    await delay(1000);

    await addCourse();
    await delay(1000);

    await addDepartment();
    await delay(1000);

    await addFaculty();
    await delay(1000);

    await addOpenedCourse();
    await delay(1000);

    await addUserDepartments();
    await delay(1000);

    await addAdvisorStudentRelationship();
    await delay(1000);

    await addStudentCourseInfo();
  } catch (error) {
    console.log("Refactore error: ", error);
  }
}
module.exports = {
  addTempRecords,
};
