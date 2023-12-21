// Отримуємо значення куки по ключу
export default function getCookie(name) {
	let matches = document.cookie.match(
		// eslint-disable-next-line
		new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
	)
	return matches ? decodeURIComponent(matches[1]) : undefined
}
