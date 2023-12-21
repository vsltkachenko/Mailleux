export default function calcTotalCount(items) {
	return items.reduce((acc, obj) => obj.count + acc, 0)
}
