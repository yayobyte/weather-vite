const months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const weekdays = [
	'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
]

export const isDayTime = (date: Date) => {
	const hours = date.getHours()
	return hours >= 6 && hours < 18
}

export const formatDate = (date: Date): string => {
	const weekday = weekdays[date.getDay()]
	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()
	return `${weekday}, ${day} ${month} ${year}`
}

export const getTimeInTimezone = (
  tz_id: string,
): string => {
  
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: tz_id
    });
    
    return formatter.format(new Date());
  } catch (error) {
    console.error(`Error formatting time for timezone ${tz_id}:`, error);
    return new Date().toLocaleTimeString();
  }
}

// Format date time string into short time: 9 pm
export const formatHour = (dateTimeString: string) => {
  const date = new Date(dateTimeString)
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options)
    .format(date)
    .replace(/\./g, '')
    .toLowerCase();
}