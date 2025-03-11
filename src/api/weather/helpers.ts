export enum weatherEffects {
  'FOG_EFFECT' = 'FOG_EFFECT',
  'SNOW_EFFECT' = 'SNOW_EFFECT',
  'RAIN_EFFECT' = 'RAIN_EFFECT',
  'CLOUDY_EFFECT' = 'CLOUDY_EFFECT',
  'HAZY_EFFECT' = 'HAZY_EFFECT',
  'OVERCAST_EFFECT' = 'OVERCAST_EFFECT'
}

const weatherEffectMapping: Record<number, weatherEffects | null> = {
  1000: null,
  1003: weatherEffects.CLOUDY_EFFECT,
  1006: weatherEffects.CLOUDY_EFFECT,
  1009: weatherEffects.OVERCAST_EFFECT,
  1030: weatherEffects.FOG_EFFECT,
  1063: weatherEffects.RAIN_EFFECT,
  1066: weatherEffects.SNOW_EFFECT,
  1114: weatherEffects.SNOW_EFFECT,
  1117: weatherEffects.SNOW_EFFECT,
  1135: weatherEffects.FOG_EFFECT,
  1147: weatherEffects.FOG_EFFECT,
  1183: weatherEffects.RAIN_EFFECT,
  1189: weatherEffects.RAIN_EFFECT,
  1195: weatherEffects.RAIN_EFFECT,
  1213: weatherEffects.SNOW_EFFECT,
  1219: weatherEffects.SNOW_EFFECT,
  1225: weatherEffects.SNOW_EFFECT,
  1237: weatherEffects.SNOW_EFFECT,
};

export const getWeatherEffect = (weatherConditionCode: number) => {
  return weatherEffectMapping[weatherConditionCode] || null
}