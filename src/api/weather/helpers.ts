const SUGGEST_ON_WEATHER_CONDITIONS = import.meta.env.VITE_FEATURE_FLAG_SUGGEST_ON_WEATHER_CONDITIONS

export enum weatherConditionQueries {
  'FOG' = 'fog',
  'SNOW' = 'snow',
  'RAIN' = 'rain',
  'CLOUDY' = 'cloudy',
  'HAZY' = 'hazy',
  'OVERCAST' = 'overcast'
}

const weatherEffectMapping: Record<number, weatherConditionQueries | null> = {
  1000: null,
  1003: weatherConditionQueries.CLOUDY,
  1006: weatherConditionQueries.CLOUDY,
  1030: weatherConditionQueries.FOG,
  1063: weatherConditionQueries.RAIN,
  1066: weatherConditionQueries.SNOW,
  1114: weatherConditionQueries.SNOW,
  1117: weatherConditionQueries.SNOW,
  1135: weatherConditionQueries.FOG,
  1147: weatherConditionQueries.FOG,
  1183: weatherConditionQueries.RAIN,
  1189: weatherConditionQueries.RAIN,
  1195: weatherConditionQueries.RAIN,
  1213: weatherConditionQueries.RAIN,
  1219: weatherConditionQueries.RAIN,
  1225: weatherConditionQueries.RAIN,
  1237: weatherConditionQueries.RAIN,
};

export const getWeatherQuery = (weatherConditionCode: number | undefined) => {
  if (!SUGGEST_ON_WEATHER_CONDITIONS) { return null }
  if (!weatherConditionCode) { return null }
  return weatherEffectMapping[weatherConditionCode] || null
}

export const getUvIndexLabel = (uv: number): string => {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}