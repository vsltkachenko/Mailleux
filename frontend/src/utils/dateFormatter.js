// const dateFormatter = date => {
// 	return date.slice(0, 10).split('-').reverse().join('/')
// }

var options = {
	// weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}
const dateFormatter = date => {
	return new Date(date).toLocaleDateString('fr-FR', options)
}

export default dateFormatter
