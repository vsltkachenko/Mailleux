import React from 'react'

import SectionsWrapper from '../../shared/SectionsWrapper/SectionsWrapper'
import MainSlider from '../../components/MainSlider/MainSlider'
import Spaces from '../../components/Spaces/Spaces'
import Office from '../../components/Office/Office'
import Gallery from '../../components/Gallery/Gallery'
import News from '../../components/News/News'
import Partners from '../../components/Partners/Partners'
import Shop from '../../components/Shop/Shop'
import SelectedProducts from '../../components/SelectedProducts/SelectedProducts'

const Home = () => {	
	return (
		<SectionsWrapper>
			<MainSlider />
			<Spaces />
			<Office />
			<Gallery />
			<News />
			<Partners />
			<Shop />
			<SelectedProducts />
		</SectionsWrapper>
	)
}

export default Home
