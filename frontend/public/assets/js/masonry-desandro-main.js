// Masonry Desandro js

let timer = setInterval(() => {
	let grid = null
	grid = document.querySelector('.grid')

	if (grid) {
		clearInterval(timer)
		const msnry = new Masonry(grid, {
			// options
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			itemSelector: '.grid-item',

			isFitWidth: true,
			// gutter: 10,
			transitionDuration: '0.5s',
		})

		// ImagesLoaded
		imagesLoaded(grid).on('progress', function () {
			msnry.layout()
		})
	}
}, 100)


