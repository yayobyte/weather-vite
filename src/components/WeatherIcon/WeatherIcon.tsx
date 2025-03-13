import { Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudHail, Snowflake } from "lucide-react";

const weatherIconMapping: Record<number, React.ElementType> = {
  1000: Sun,
  1003: CloudSun,
  1006: Cloud,
  1009: Cloud,
  1030: CloudFog,
  1063: CloudRain,
  1066: Snowflake,
  1069: CloudHail,
  1072: Cloud,
  1087: CloudLightning,
  1114: CloudSnow,
  1117: CloudSnow,
  1135: CloudFog,
  1147: CloudFog,
  1150: CloudDrizzle,
  1153: CloudDrizzle,
  1168: CloudHail,
  1171: CloudHail,
  1180: CloudRain,
  1183: CloudDrizzle,
  1186: CloudRain,
  1189: CloudRain,
  1192: CloudLightning,
  1195: CloudLightning,
  1198: CloudHail,
  1201: CloudHail,
  1204: CloudHail,
  1207: CloudHail,
  1210: Snowflake,
  1213: Snowflake,
  1216: CloudSnow,
  1219: CloudSnow,
  1222: CloudSnow,
  1225: CloudSnow,
  1237: CloudHail,
  1240: CloudDrizzle,
  1243: CloudRain,
  1246: CloudLightning,
  1249: CloudHail,
  1252: CloudHail,
  1255: Snowflake,
  1258: CloudSnow,
  1261: CloudHail,
  1264: CloudHail,
  1273: CloudLightning,
  1276: CloudLightning,
  1279: CloudSnow,
  1282: CloudSnow,
};

interface WeatherIconProps {
  code: number;
  size?: number;
}

const WeatherIcon = ({ code, size = 24 }: WeatherIconProps) => {
  const IconComponent = weatherIconMapping[code] || Cloud;
  return <IconComponent size={size} />;
};

export default WeatherIcon;
