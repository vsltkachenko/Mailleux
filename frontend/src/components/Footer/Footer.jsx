import React from 'react'

import './Footer.scss'
import { Link } from 'react-router-dom'
import Logo from '../../shared/Logo/Logo'
import paymentsImages from './paymentsImages.js'
import { Accordion } from '../../shared/Accordion/Accordion'
import useIsMobile from '../../hooks/useIsMobile'

const footerMenuList = [
	{
		title: 'Votre visite',
		content: [
			{ text: 'Nos espaces', link: '/les-espaces' },
			{ text: 'Nos promotions', link: '/news/promotion' },
			{ text: 'Soyez inspirés', link: '/projects/soyez-inspires' },
			{ text: 'L’actualité', link: '/news/actus' },
			{ text: 'Blog', link: '/news/blog' },
		],
	},
	{
		title: 'La société',
		content: [
			{ text: 'Meubles Mailleux', link: '/philosophie' },
			{ text: 'Nos magasins', link: '/nos-magasins' },
			{ text: 'Blog', link: '/news/blog' },
		],
	},
	{
		title: 'On s’y engage',
		content: [
			{ text: 'Garanties', link: '/points-forts#s-4' },
			{ text: 'Paiements sécurisés', link: '/methode-de-paiement' },
			{ text: 'SAV', link: '/sav' },
			{ text: 'Questions fréquentes', link: '/faqs' },
			{ text: 'CGV', link: '/cgv' },
		],
	},
	{
		title: 'Restons en contact',
		content: [
			{ text: 'Newsletter', link: '/newsletter' },
			{ text: 'Paiements sécurisés', link: '/methode-de-paiement' },
			{ text: 'Job', link: '/news/jobs' },
			{ text: 'Contact', link: '/contact' },
		],
	},
	{
		title: 'E-commerce',
		content: [
			{ text: 'Mon compte', link: '/sales/customer/dashboard' },
			{ text: 'Mes commandes', link: '/sales/order' },
			{ text: 'Ma sélection', link: '/catalog/wishlist' },
			{ text: 'Livraison', link: '/livraison' },
			{ text: 'Retrait en magasin', link: '/faqs' },
		],
	},
]

const Footer = () => {
	const isMobile = useIsMobile(480)

	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer-top'>
					<nav className='footer-nav'>
						{!isMobile &&
							footerMenuList.map((item, index) => (
								<div className='footer-nav__column' key={index}>
									<div className='footer-nav__title'>{item.title}</div>
									<ul className='footer-nav__menu'>
										{item.content.map((link, i) => (
											<li className='footer-nav__item' key={i}>
												<Link to={link.link} className='footer-nav__link'>
													{link.text}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						{isMobile && <Accordion list={footerMenuList} classes={'footer-nav__accordion'} />}
						<div className='footer-nav__column'>
							<div className='footer-nav__title'>Paiements en ligne sécurisés</div>
							<Link to='/methode-de-paiement' className='payments__link'>
								<ul className='payments__list'>
									{paymentsImages.map((image, index) => (
										<li className='payments__logo' key={index}>
											<img src={image} alt='' />
										</li>
									))}
								</ul>
							</Link>
						</div>
					</nav>
				</div>
				<div className='footer-bottom'>
					<div className='footer-bottom__info'>
						<Logo />
						<Link to='/' className='footer-bottom__copyright'>
							Copyright © 2018-2023 Meubles Mailleux. Tous droits reservés.{' '}
						</Link>
					</div>
					<div className='footer-bottom__link'>
						<a href='/' className='_icon-x-logo' alt=''>
							x
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
