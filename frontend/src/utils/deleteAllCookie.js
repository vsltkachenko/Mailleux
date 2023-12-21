export function deleteCookieAll() {
	var mas = document.cookie.split(';')
	for (var i = 0; i < mas.length; i++) {
		let name = mas[i].substring(0, mas[i].indexOf('='))
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	}
}