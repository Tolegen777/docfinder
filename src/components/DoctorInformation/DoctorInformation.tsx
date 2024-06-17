'use client'

import React, { useState } from 'react'
import styles from './DoctorInformation.module.scss'

const DoctorInformation: React.FC = ({ modalFunction }) => {
	const dateSchedule = [
		{ number: 10, ned: 'пн' },
		{ number: 11, ned: 'вт' },
		{ number: 12, ned: 'ср' },
		{ number: 13, ned: 'чт' },
		{ number: 14, ned: 'пт' }
	]
	const dataClock = [
		{ clock: '11:30' },
		{ clock: '12:30' },
		{ clock: '13:30' },
		{ clock: '14:30' },
		{ clock: '15:30' },
		{ clock: '16:30' },
		{ clock: '17:30' },
		{ clock: '18:30' },
		{ clock: '19:30' },
		{ clock: '20:30' },
		{ clock: '21:30' },
		{ clock: '22:30' },
		{ clock: '11:30' },
		{ clock: '12:30' },
		{ clock: '13:30' },
		{ clock: '14:30' },
		{ clock: '15:30' },
		{ clock: '16:30' },
		{ clock: '17:30' },
		{ clock: '18:30' },
		{ clock: '19:30' },
		{ clock: '20:30' },
		{ clock: '21:30' },
		{ clock: '22:30' },
		{ clock: '11:30' },
		{ clock: '12:30' },
		{ clock: '13:30' },
		{ clock: '14:30' },
		{ clock: '15:30' },
		{ clock: '16:30' },
		{ clock: '17:30' },
		{ clock: '18:30' },
		{ clock: '19:30' },
		{ clock: '20:30' },
		{ clock: '21:30' },
		{ clock: '22:30' },
		{ clock: '11:30' },
		{ clock: '12:30' },
		{ clock: '13:30' },
		{ clock: '14:30' },
		{ clock: '15:30' },
		{ clock: '16:30' },
		{ clock: '17:30' },
		{ clock: '18:30' },
		{ clock: '19:30' },
		{ clock: '20:30' },
		{ clock: '21:30' },
		{ clock: '22:30' }
	]
	const [showAll, setShowAll] = useState(false)
	const toggleShowAll = () => {
		setShowAll(!showAll)
	}
	return (
		<div>
			<section id={styles.doctorInformation}>
				<div className='container'>
					<div className={styles.doctorInformation}>
						<div className={styles.doctorInformationBlock}>
							<div className={styles.doctorInformationImg}>
								<img
									onClick={modalFunction}
									className={styles.doctorInformationPhoto}
									src='https://s3-alpha-sig.figma.com/img/71c5/f5cf/fcf47990608a7c3d3922eeee844bd872?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZoT6yrjy~zJ5jgyIN0IPrfnMwYPUDZfwuH~p-kGoQnbhpWoq0FM6Zjp10hCRsKRCKT06KnPCrj-jHobyYBvytew9cQM-NV9ZyTAuT6IzzNTjl1g8BcvQCf-XF3u15xqE8CrkgM46lSjIddivx8~wWpbUHOGBilCreqajyaNC6IKy10cA7LXfBzDSOiOhR~Sc3z~~HAbbxnvCx4DeASuLefEVxZOGdiCGU-mcRpNcDTI1mI6erlE3kJCBua4540fW9B~bPmeKGXwrAxSH-sJZrw6mqGPgq2tfzYYAUcROpml1H4Hk1lmWGUKbIf6lCDrXMlYmhjJ2DVTGUhp5yUpmFw__'
									alt=''
								/>
								<h4 className={styles.doctorInformationReiting}>8.7</h4>
								<h5 className={styles.doctorInformationh5}>6 отзывов</h5>
							</div>
							<div className={styles.doctorInformationDecr}>
								<h3 className={styles.doctorInformationName}>
									Уралбаев <br />
									Данияр Оразбекович
								</h3>
								<h4 className={styles.doctorInformationUrl}>Уролог</h4>
								<h4 className={styles.doctorInformationOpt}>Стаж 5 лет</h4>
								<h5 className={styles.doctorInformationClin}>
									Прием в клинике
								</h5>
								<div className={styles.doctorInformationSale}>
									<h4 className={styles.doctorInformationPrice}>
										<span className={styles.doctorInformationPriceMinus}>
											10000{' '}
										</span>
										7000 тг.
									</h4>
									<h4 className={styles.doctorInformationMinusPro}>-30%</h4>
								</div>
								<h3 className={styles.doctorInformationEm}>ЭМИРМЕД</h3>
								<p className={styles.doctorInformationMap}>
									Улица Розыбакиева, 37в <br />
									Тастак-3 м-н, Алмалинский район, Алматы
								</p>
								<h6 className={styles.doctorInformationMapH6}>На карте</h6>
							</div>

							<div className={styles.doctorInformationDate}>
								<div className={styles.doctorInformationMonths}>
									<h4 className={styles.doctorInformationMonthAp}>Апрель</h4>
									<select className={styles.doctorInformationMonthsSelect}>
										<option>Май</option>
									</select>
									<h4 className={styles.doctorInformationMonthsIn}>Июнь</h4>
								</div>
								<div className={styles.doctorInformationWeeks}>
									{dateSchedule.map((el, key) => (
										<div
											className={styles.doctorInformationWeeksMonth}
											key={key}
										>
											<h3 className={styles.doctorInformationWeeksElH3}>
												{el.number}
											</h3>
											<h5 className={styles.doctorInformationWeeksElH5}>
												{el.ned}
											</h5>
										</div>
									))}
								</div>
								<div className={styles.doctorInformationClock}>
									{dataClock
										.slice(0, showAll ? dataClock.length : 5)
										.map((el, key) => (
											<h4 className={styles.doctorInformationClockH4} key={key}>
												{el.clock}
											</h4>
										))}
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<button
										onClick={toggleShowAll}
										className={styles.showAllButton}
									>
										{showAll ? 'Скрыть' : 'Показать еще'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default DoctorInformation
