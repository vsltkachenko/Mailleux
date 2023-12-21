const priceFormatter = num => {
	const float = num.toFixed(2)
	if (num >= 1000) {
		const thousands = Math.trunc(float / 1000)
		return thousands + ' ' + String(float).replace('.', ',').slice(-6)
	}
	return String(float).replace('.', ',')
}
export default priceFormatter
