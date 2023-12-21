export default function calcTotalPrice(items) {
	const sum = items.reduce((acc, obj) => obj.price * obj.count + acc, 0)

	return +sum.toFixed(2)
}
