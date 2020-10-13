export const required = (value) =>
  value && value.length > 0 ? undefined : "* Обязательное поле";
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Некорректный email адрес"
    : undefined;
const minLength = (min) => (value) =>
  value && value.length < min ? `Минимум ${min} символов` : undefined;
export const minLength6 = minLength(6);
export const gender = (value) =>
  value === "0" ? "Выберите Ваш пол" : undefined;
