/**
 * Open-Meteo Weather API for Emerton, NSW (-33.74, 150.81)
 * Free API with no key needed
 */

const LAT = -33.74;
const LON = 150.81;

// WMO Weather interpretation codes
function interpretWmoCode(code) {
  if (code === 0) return { desc: "Clear sky", isRain: false, isSunny: true };
  if ([1, 2].includes(code)) return { desc: "Mostly clear", isRain: false, isSunny: true };
  if (code === 3) return { desc: "Overcast", isRain: false, isSunny: false };
  if ([45, 48].includes(code)) return { desc: "Foggy", isRain: false, isSunny: false };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { desc: "Rainy", isRain: true, isSunny: false };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { desc: "Snowy", isRain: true, isSunny: false };
  if ([95, 96, 99].includes(code)) return { desc: "Thunderstorm", isRain: true, isSunny: false };
  return { desc: "Fair", isRain: false, isSunny: false };
}

export async function fetchEmertonWeather() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Weather request failed");
    
    const data = await res.json();
    const current = data.current_weather;
    if (!current) throw new Error("No current weather data");

    const temp = Math.round(current.temperature);
    const codeInfo = interpretWmoCode(current.weathercode);

    let mode = "mild"; // 17 - 26 C default
    let headline = "Chef's Daily Specials";
    let subline = "Hand-crafted comfort dishes prepared fresh today in Emerton.";
    let categoryFocus = ["burgers", "hot-roasts"];

    if (temp < 17 || codeInfo.isRain) {
      mode = "cold_rain";
      headline = "Cold outside? Warm up with…";
      subline = "Hot roasts, sizzling burgers, and hearty simmering curries to beat the chill.";
      categoryFocus = ["hot-roasts", "curries", "burgers"];
    } else if (temp > 26) {
      mode = "hot";
      headline = "Beat the heat with…";
      subline = "Crisp golden fish and chips, fresh summer salads, and ice-cold drinks.";
      categoryFocus = ["fish-chips", "drinks", "sides"];
    } else {
      mode = "mild";
      headline = "Perfect Takeaway Weather";
      subline = "From flame-grilled Angus to fresh golden seafood packs, discover your favourite.";
      categoryFocus = ["burgers", "fish-chips", "curries"];
    }

    const chipText = `${temp}°C · ${codeInfo.desc} in Emerton`;

    return {
      success: true,
      temp,
      isRain: codeInfo.isRain,
      isSunny: codeInfo.isSunny,
      description: codeInfo.desc,
      mode,
      headline,
      subline,
      categoryFocus,
      chipText,
    };
  } catch (err) {
    // Silent graceful fallback to normal mild mode
    return {
      success: false,
      temp: 21,
      isRain: false,
      isSunny: true,
      description: "Fine",
      mode: "mild",
      headline: "Perfect Takeaway Weather",
      subline: "Flame-grilled burgers, fresh fish & chips, and authentic curries made to order.",
      categoryFocus: ["burgers", "fish-chips"],
      chipText: "21°C · Fine in Emerton",
    };
  }
}
