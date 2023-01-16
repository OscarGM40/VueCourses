const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const getDayMonthYear = (dateString) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month : months[date.getMonth()],
    yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`
  }
};

export default getDayMonthYear;
