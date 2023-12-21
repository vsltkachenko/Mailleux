export default function lockBody(active) {
	active ? document.body.classList.add('lock') : document.body.classList.remove('lock')
}
