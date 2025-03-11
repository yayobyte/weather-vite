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