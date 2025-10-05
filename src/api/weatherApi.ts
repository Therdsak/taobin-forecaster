import { WeatherDaily } from "../types/weather";

export const fetch7DayForecast = async (): Promise<WeatherDaily> => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=13.754&longitude=100.5014&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok"
  );
  if (!res.ok) throw new Error("Failed to fetch weather data");
  const data = await res.json();
  return data.daily;
};
