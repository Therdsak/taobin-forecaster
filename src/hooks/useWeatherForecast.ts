import { useEffect, useState } from "react";
import { fetch7DayForecast } from "../api/weatherApi";
import { WeatherDaily } from "../types/weather";

export const useWeatherForecast = () => {
  const [forecast, setForecast] = useState<WeatherDaily | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch7DayForecast()
      .then((data) => setForecast(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { forecast, loading, error };
};
