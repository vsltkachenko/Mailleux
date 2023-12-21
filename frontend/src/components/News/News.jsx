import React from 'react'
import './News.scss'

import newsImages from './newsImages.js'
import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import { Link } from 'react-router-dom'

const news = [
	{
		title: "Conditions d'ouverture",
		text: 'Profitez des conditions exceptionnelles dans nos 3 magasins!',
	},
	{
		title: 'Le nouveau Bastogne',
		text: "Les travaux de l'agrandissement et de la rénovation sont terminés.",
	},
	{
		title: '-20% Stressless',
		text: 'Sur une sélection de fauteuils ! ',
	},
]

const News = () => {
	return (
		<section className='news'>
			<div className='container'>
				<div className='news__content'>
					<SectionHeader title='Actus' subtitle='News' />
					<div className='news__cards'>
						{news.map((item, index) => (
							<article className='news__card card-news' key={index}>
								<Link to='/' className='card-news__image' alt=''>
									<img src={newsImages[index]} alt='' />
								</Link>
								<div className='card-news__content'>
									<Link to='/' className='card-news__title' alt=''>
										<h3>{item.title}</h3>
									</Link>
									<p className='card-news__text'>{item.text}</p>
									<Link to='/' className='card-news__link mini-link' alt=''>
										<span>Lire la suite</span>
									</Link>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default News
