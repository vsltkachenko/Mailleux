import React, { useEffect, useState } from 'react'
import './Dashboard.scss'

import useIsMobile from '../../hooks/useIsMobile'
import MenuButton from '../../shared/MenuButton/MenuButton'
import SectionHeader from '../../shared/SectionHeader/SectionHeader'
import useOverflowInitial from '../../hooks/useOverflowInitial'
import Aside from '../../components/Aside/Aside'
import useScrollToTop from '../../hooks/useScrollToTop'
import DashboardMenu from './DashboardMenu'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserFillIcon from 'remixicon-react/UserFillIcon'
import ShoppingCart2FillIcon from 'remixicon-react/ShoppingCart2FillIcon'
import CouponFillIcon from 'remixicon-react/CouponFillIcon'
import MapPinFillIcon from 'remixicon-react/MapPinFillIcon'
import HeartFillIcon from 'remixicon-react/HeartFillIcon'
import PencilFillIcon from 'remixicon-react/PencilFillIcon'
import LockFillIcon from 'remixicon-react/LockFillIcon'
import LogoutBoxRFillIcon from 'remixicon-react/LogoutBoxRFillIcon'

import CartDetails from '../../shared/CartDetails/CartDetails'
import dateFormatter from '../../utils/dateFormatter'
import modifyOrderList from '../../utils/modifyOrderList'
import ChangePass from '../../shared/ChangePass/ChangePass'
import CustomerProfile from '../../shared/CustomerProfile/CustomerProfile'

const Dashboard = () => {
	const { isLoading, isAuth } = useSelector(state => state.auth)
	const isMobile = useIsMobile(992)
	const { path } = useParams()

	const navigate = useNavigate()
	useScrollToTop()
	useOverflowInitial()

	const [isAsideOpen, setAsideOpen] = useState(false)
	const asideClose = () => setAsideOpen(false)

	useEffect(() => {
		let timer = setTimeout(() => {
			// console.log('isAuth', isAuth)
			// console.log('isLoading', isLoading)
			if (!isAuth && !isLoading) {
				navigate('/login')
			}
		}, 300)
		return () => {
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth, isLoading])

	const currentUser = useSelector(state => state.auth.currentUser)

	if (currentUser) {
		var registrationDate = dateFormatter(currentUser.createdAt)
		var orderList = currentUser.orderList
		var orderListLength = orderList?.length

		if (orderListLength) {
			orderList = modifyOrderList(orderList)
			var lastOrderProducts = orderList[0].orderProducts
		}
	}

	const dashboardData = [
		{
			section: 'Mon compte',
			icon: <UserFillIcon size={16} />,
			title: 'Dernières commandes',
			text: orderListLength ? '' : "Pas de commandes pour l'instant",
			path: 'customer',
		},
		{
			section: 'Mes commandes',
			icon: <ShoppingCart2FillIcon size={16} />,
			title: 'Mes commandes',
			text: orderListLength ? '' : "Pas de commandes pour l'instant",
			path: 'orders',
		},
		{
			section: 'Mes codes promos',
			icon: <CouponFillIcon size={16} />,
			title: 'CouponCodes.Title',
			text: 'Aucun coupons disponibles',
			path: 'promo',
		},
		{
			section: 'Mes adresses',
			icon: <MapPinFillIcon size={16} />,
			title: 'Mes adresses',
			text: '',
			path: 'address',
		},
		{
			section: 'Mes listes',
			icon: <HeartFillIcon size={16} />,
			title: 'Mes listes',
			text: '',
			path: 'wish',
		},
		{
			section: 'Modifier mon compte',
			icon: <PencilFillIcon size={16} />,
			title: 'Modifier mon compte',
			text: "Les modifications apportées à votre compte n'impacteront pas les commandes existantes. Ces informations seront utilisées par défaut pour vos prochaines commande sur le site",
			path: 'edit',
		},
		{
			section: 'Changez mon mot de passe',
			icon: <LockFillIcon size={16} />,
			path: 'changepass',
		},
		{
			section: 'Se déconnecter',
			icon: <LogoutBoxRFillIcon size={16} />,
			path: 'logout',
		},
	]

	const currentSection = dashboardData.find(item => item.path === path)

	return (
		<section className='dashboard'>
			<div className='container'>
				<div className='dashboard__body'>
					<Aside
						active={isAsideOpen && isMobile}
						asideClose={asideClose}
						classes={'dashboard__aside'}
					>
						<DashboardMenu data={dashboardData} asideClose={asideClose} path={path} />
					</Aside>

					<div className='dashboard__content'>
						<section className='dashboard__section'>
							{path === 'customer' && (
								<div className='dashboard__client'>
									{currentUser && <h2>{currentUser.username}</h2>}
									{registrationDate && <p>Client depuis le {registrationDate}</p>}
								</div>
							)}
							{currentSection.title && (
								<SectionHeader
									title={currentSection.title}
									text={currentSection.text}
									classes={'dashboard__header'}
								/>
							)}
							{path === 'customer' && !!orderListLength && (
								<CartDetails
									items={lastOrderProducts}
									order={orderListLength ? orderList[0] : null}
								/>
							)}
							{path === 'orders' &&
								!!orderListLength &&
								orderList.map((order, index) => (
									<CartDetails
										key={index}
										items={order.orderProducts}
										order={orderListLength ? orderList[index] : null}
									/>
								))}
							{path === 'changepass' && <ChangePass />}
							{path === 'edit' && <CustomerProfile />}
						</section>
					</div>
				</div>
				<MenuButton
					classes='dashboard__button'
					active={isAsideOpen && isMobile}
					setActive={setAsideOpen}
				/>
			</div>
		</section>
	)
}

export default Dashboard
