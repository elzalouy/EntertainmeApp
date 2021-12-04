const _ = require("lodash");
export function getDate(str) {
  const monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(str);
  let month = date.getMonth();
  let monthNum = month + 1;
  month = monthsName[month];
  const year = date.getFullYear();
  const day = date.getDate();
  const type = date.getTimezoneOffset();
  return { date, year, month, day, type, monthNum };
}
export function getTime(time) {
  const values = _.split(time, ":");
  const hour = values[0];
  let minutes = values[1];
  let seconds = 0;
  if (values.length === 3) {
    seconds = values[2];
  }
  return { hour, minutes, seconds };
}
