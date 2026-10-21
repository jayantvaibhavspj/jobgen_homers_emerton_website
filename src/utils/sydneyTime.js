/**
 * Utilities to compute live Sydney opening status
 */
import { OPERATING_HOURS } from '../config';

export function getSydneyTime() {
  // Use Intl.DateTimeFormat to compute time in Australia/Sydney
  const now = new Date();
  const sydneyString = now.toLocaleString("en-US", { timeZone: "Australia/Sydney" });
  return new Date(sydneyString);
}

export function getShopStatus() {
  const sydneyNow = getSydneyTime();
  const dayIndex = sydneyNow.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const currentHour = sydneyNow.getHours();
  const currentMinute = sydneyNow.getMinutes();
  const currentTimeDecimal = currentHour + currentMinute / 60;

  // Schedule array matches 0 = Sun, 1 = Mon ...
  const todaySchedule = OPERATING_HOURS.schedule[dayIndex];
  
  // Parse open and close times
  const [openHour, openMin] = todaySchedule.opens.split(":").map(Number);
  const [closeHour, closeMin] = todaySchedule.closes.split(":").map(Number);
  
  const openDecimal = openHour + openMin / 60;
  const closeDecimal = closeHour + closeMin / 60;

  const isOpen = currentTimeDecimal >= openDecimal && currentTimeDecimal < closeDecimal;

  let label = "";
  let closingFormatted = closeHour > 12 
    ? `${closeHour - 12}${closeMin > 0 ? `:${closeMin}` : ''}pm`
    : `${closeHour}pm`;
  
  let openingFormatted = openHour > 12 
    ? `${openHour - 12}pm`
    : `${openHour}am`;

  if (isOpen) {
    label = `Open · till ${closingFormatted}`;
  } else {
    if (currentTimeDecimal < openDecimal) {
      label = `Closed · opens ${openingFormatted}`;
    } else {
      // Past closing time, will open next day 10am
      label = `Closed · opens 10am`;
    }
  }

  return {
    isOpen,
    label,
    todayIndex: dayIndex,
    todaySchedule,
    sydneyNow,
  };
}
