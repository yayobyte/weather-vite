export enum weatherConditionQueries {
  'FOG' = 'fog weather',
  'SNOW' = 'snow weather',
  'RAIN' = 'rain weather',
  'CLOUDY' = 'cloudy weather',
  'HAZY' = 'hazy weather',
  'OVERCAST' = 'overcast weather'
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
  if (!weatherConditionCode) { return null }
  return weatherEffectMapping[weatherConditionCode] || null
}