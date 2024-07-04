import { format, isToday, isTomorrow, parseISO } from "date-fns";

export const formatDate = dateString => {
  const [year, month, day] = dateString.split("-");
  const date = parseISO(dateString); // month - 1 because months are 0-indexed

  if (isToday(date)) {
    return "Today";
  }
  if (isTomorrow(date)) {
    return "Tomorrow";
  }
  return format(date, "EEEE"); // day of the week
};
export const todaysDate = dateString => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day); // month - 1 because months are 0-indexed

  if (isToday(date)) {
    return true;
  } else return false;
};
