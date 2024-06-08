import lodash from "lodash";
import moment from "moment";
import { LetterGrade, getLetterGradeKey } from "../Enum/LetterGrades";

export function serialize(obj, parentKey = null) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var key = parentKey ? parentKey + "[" + p + "]" : p;
      if (typeof obj[p] === "object") {
        str.push(serialize(obj[p], key));
      } else {
        str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[p]));
      }
    }
  }
  return str.join("&");
}

export function getQueryStringParams(query) {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          key = decodeURIComponent(key);
          value = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";

          const matches = key.match(/\[(.*?)\]/);
          if (matches) {
            const innerKey = matches[1];
            const outerKey = key.slice(0, matches.index);
            if (!params[outerKey]) {
              params[outerKey] = {};
            }
            params[outerKey][innerKey] = value;
          } else {
            params[key] = value;
          }
          return params;
        }, {})
    : {};
}

export function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function refreshPage() {
  window.location.reload(false);
}

export const getFormattedDateTime = (date) =>
  moment(date).format("DD.MM.YYYY HH:mm");
export const getFormattedDate = (date) => {
  if (date) {
    return moment(date).format("YYYY-MM-DD");
  }
  return null;
};
export const getFormattedTime = (date) => {
  if (date) {
    return moment(date).format("HH:mm");
  }
  return null;
};
export const formatDate = (date) => moment(date, "DD.MM.YYYY HH:mm");

export const getFormattedDateTr = (date) => moment(date).format("DD.MM.YYYY");
export const getFormattedDateInput = (date) =>
  moment(date).format("YYYY-MM-DD");
export const getFormattedClockTime = (date) => moment(date).format("HH:mm");
export const getFormattedDateTrTime = (date) =>
  moment(date).format("DD.MM.YYYY HH:mm");
export const diffTwoDates = (startDate, endDate) =>
  moment(endDate).diff(moment(startDate), "days") + 1;
export const diffTwoDatesByHour = (startDate, endDate) =>
  moment(endDate).diff(moment(startDate), "hours");

export const addHoursWithFormattedDateTime = (date, hours) => {
  let getDate = new Date(formatDate(date));
  getDate.setHours(getDate.getHours() + (hours ?? 3));
  return getFormattedDateTime(getDate);
};

export const convertCurrencyToTrFormat = (price) => {
  return price.replace(".", ",");
};

export function calculateVatPrice(price) {
  return price ? price * 1.2 : null;
}

export const deleteObjectKeys = (obj, keys) => {
  if (isEmpty(obj)) {
    return obj;
  }

  keys.forEach((key) => {
    if (typeof key === "string") {
      delete obj[key];
    }
  });
};

export const isObjectEmpty = (data) => {
  return Object.keys(data).length === 0;
};

/* When onApply DateRangePicker set the date */
export const handleChangeDateRangePicker = (
  setDate,
  setChosenDate,
  data,
  picker,
  filterName
) => {
  setDate(
    picker.startDate.format("DD-MM-YYYY"),
    picker.endDate.format("DD-MM-YYYY"),
    filterName
  );
  setChosenDate(
    picker.startDate.format("DD-MM-YYYY") +
      " - " +
      picker.endDate.format("DD-MM-YYYY")
  );
};

/* Clear input of Bootstrap DateRangePicker without Refresh Page */
export const clearDateRangePicker = (
  query,
  setQuery,
  startDate,
  endDate,
  setInputValue
) => {
  delete query[startDate];
  delete query[endDate];
  setInputValue("");

  setQuery(query);
};

export const handleDateRangeOnApply = (
  data,
  picker,
  startDateName,
  endDateName,
  setValue
) => {
  setValue(startDateName, picker.startDate.format("DD-MM-YYYY"));
  setValue(endDateName, picker.endDate.format("DD-MM-YYYY"));
};

export const parseTimeStringToObject = (string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    return null;
  }
};

export function isInArray(needle, haystack) {
  let length = haystack.length;
  for (let i = 0; i < length; i++) {
    if (haystack[i] === needle) return true;
  }

  return false;
}

export const sortTable = (key, query, setQuery, setActivePage) => {
  const s = query;
  if (s.sort === key) {
    if (s.dir === "asc") {
      s.dir = "desc";
    } else if (s.dir === "desc") {
      s.dir = "asc";
    }
  } else {
    s.dir = "asc";
  }
  s.sort = key;
  s.page = 1;

  setQuery((prevState) => {
    return {
      ...prevState,
      ...s,
    };
  });

  setActivePage(1);
};

export const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñçğüş·/_,:;";
  var to = "aaaaeeeeiiiioooouuuuncgus------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const camelToSnakeCase = (str) => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const hasAnyArrayItem = (needle, array) => {
  let result = false;
  array.forEach((item) => {
    if (item[needle]) {
      return (result = true);
    }
  });
  return result;
};

export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const getTimeValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export function findItem({ items, value, valueKey }) {
  return items[items.findIndex((item) => item[valueKey] === value)];
}

export function selectMapper({ items, labelKey, valueKey }) {
  return items.map((item) => ({
    label: lodash.get(item, labelKey),
    value: lodash.get(item, valueKey),
  }));
}

export function maxLengthTransformation(stringValue, maxLength) {
  return maxLength
    ? stringValue.substring(0, maxLength) +
        (stringValue.length > maxLength ? "..." : "")
    : stringValue;
}

export function getItem(items, value, key) {
  var item = items.find((item) => {
    return item.key === value;
  });
  if (item) {
    return item[key];
  }
  return null;
}

export const getRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomBackgroundColor = () => {
  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const unixTimeStampToDateTime = (unixTimeStamp) => {
  var unixTimeStampInMilliseconds = unixTimeStamp * 1000;
  var dateTime = new Date(unixTimeStampInMilliseconds);
  var dateTimeString = dateTime.toUTCString();

  return dateTimeString;
};

export const formSetter = ({ form, values }) => {
  Object.keys(values).forEach((key) => {
    form.setValue(key, values[key] ?? undefined);
  });
};

export const calculateGrade = (score, gradeScaleJSON) => {
  if (isEmpty(gradeScaleJSON)) return "";

  const gradeScale = JSON.parse(gradeScaleJSON);

  for (const [letterGrade, value] of Object.entries(gradeScale)) {
    if (score >= value) {
      return letterGrade;
    }
  }

  return LetterGrade.FF;
};

export const calculateInfo = (courses) => {
  let totalCredit = 0;
  let calculateTotalCredit = 0;
  let totalGradeCredit = 0;

  courses.forEach((course) => {
    totalCredit += course.credit;
    if (getLetterGradeKey(course.letterGrade, "letterGradeValue")) {
      calculateTotalCredit += course.credit;
      totalGradeCredit +=
        course.credit *
        getLetterGradeKey(course.letterGrade, "letterGradeValue");
    }
  });

  const yano =
    totalGradeCredit !== 0 ? totalGradeCredit / calculateTotalCredit : 0;

  return {
    totalCredit,
    yano,
  };
};

export const calculateSchedules = (days, hours) => {
  const validDays = days
    .map((day, index) => ({ day: day, hours: hours[index] }))
    .filter(({ hours }) => hours !== null);

  const schedulesJSON = validDays.map(({ day, hours }) => ({ day, hours }));

  return JSON.stringify(schedulesJSON);
};
export const dateTimeToUnixTimeStamp = (dateTimeString) => {
  var dateTime = new Date(dateTimeString);
  var unixTimeStampInMilliseconds = dateTime.getTime();
  var unixTimeStamp = unixTimeStampInMilliseconds / 1000;

  return unixTimeStamp;
};

export const getCurrentSemester = () => {
  const tarih = new Date();

  const ay = tarih.getMonth();

  if (ay >= 1 && ay <= 6) {
    return 2;
  } else if (ay >= 6 && ay <= 8) {
    return 3;
  } else {
    return 1;
  }
};

export const getCurrentYear = () => {
  const tarih = new Date();

  const ay = tarih.getMonth();

  if (ay === 0 || ay === 1) {
    const yil = tarih.getFullYear();
    return yil - 1;
  } else {
    return tarih.getFullYear();
  }
};

export const createStudentId = (departmentId, facultyId) => {
  const formattedDepartmentId = departmentId.toString().padStart(2, "0");
  const formattedFacultyId = facultyId.toString().padStart(2, "0");

  const year = new Date().getFullYear();
  const yearLastTwoDigits = year.toString().slice(-2);

  const uniqueId = `${formattedFacultyId}${formattedDepartmentId}${yearLastTwoDigits}`;

  return uniqueId;
};

export const generateUniqueStudentId = (departmentId, facultyId, users) => {
  const uniqueIdBase = createStudentId(departmentId, facultyId);
  const matchingUsers = users?.filter((user) =>
    user.number?.startsWith(uniqueIdBase)
  );
  const newUniqueId = `${uniqueIdBase}${(matchingUsers?.length + 1)
    .toString()
    .padStart(3, "0")}`;

  return newUniqueId;
};
