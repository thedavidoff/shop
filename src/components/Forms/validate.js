export const required = (value) =>
  value && value.length > 0 ? undefined : "* Обязательное поле";
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "некорректный email адрес"
    : undefined;
const minLength = (min) => (value) =>
  value && value.length < min
    ? `минимум ${min} символов`
    : undefined;
export const minLength6 = minLength(6);
