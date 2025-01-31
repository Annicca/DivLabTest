const NUMBER_WIDTH_RATIO = 1.2;

// Функция проверки валидно введенного значения - числа
const isValidateNumber = (value) => /^-?\d*$/.test(value);

// Функция для форматирования числа по разрядам
const formatNumber = (num) => {
  if (typeof num !== "string" && typeof num !== "number") return "";
  const str = num.toString();
  if (str.length <= 5) return str;
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Функция для нормализации числа (удаление пробелов и приведение к числу)
const normalizeNumber = (str) => {
  return str.replace(/\s/g, "");
};

// Функция вычисления нового размера input
const changeWidth = (value) =>
  Math.max(normalizeNumber(value).length * NUMBER_WIDTH_RATIO, 1);

export default {
  changeWidth,
  isValidateNumber,
  formatNumber,
  normalizeNumber,
};
