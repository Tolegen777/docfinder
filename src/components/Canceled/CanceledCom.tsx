import React from 'react'
import styles from './CanceledCom.module.scss'

const CanceledCom: React.FC = () => {
	return (
		<div>
			<section id={styles.successfullyCom}>
				<div className='container'>
					<div className={styles.successfullyCom}>
						<svg
							width='60'
							height='60'
							style={{
								margin: '30px 0 20px 0'
							}}
							viewBox='0 0 70 70'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M35 0C15.68 0 0 15.68 0 35C0 54.32 15.68 70 35 70C54.32 70 70 54.32 70 35C70 15.68 54.32 0 35 0ZM35 63C19.53 63 7 50.47 7 35C7 28.525 9.205 22.575 12.915 17.85L52.15 57.085C47.425 60.795 41.475 63 35 63ZM57.085 52.15L17.85 12.915C22.575 9.205 28.525 7 35 7C50.47 7 63 19.53 63 35C63 41.475 60.795 47.425 57.085 52.15Z'
								fill='#E80000'
							/>
						</svg>

						<h3 className={styles.successfullyComH3}>Ваша запись отменена</h3>

						<div className={styles.successfullyComFlex}>
							<h3 className={styles.successfullyComFlexH3}>Дата приема</h3>
							<h4 className={styles.successfullyComFlexH4}>
								10 мая 2024, 11:30
							</h4>
						</div>
						<div className={styles.successfullyComFlex}>
							<h3 className={styles.successfullyComFlexH3}>Врач</h3>
							<h4 className={styles.successfullyComFlexH4}>
								Уралбаев Данияр Оразбекович <br />
								<span className={styles.successfullyComFlexSpan}>Уролог</span>
							</h4>
						</div>
						<div className={styles.successfullyComFlex}>
							<h3 className={styles.successfullyComFlexH3}>Адрес</h3>
							<h4 className={styles.successfullyComFlexH4}>
								ЭМИРМЕД
								<br />
								<span className={styles.successfullyComFlexSpan}>
									Улица Розыбакиева, 37в Тастак-3 м-н, Алмалинский район, Алматы
								</span>
							</h4>
						</div>
						<div className={styles.successfullyComFlex}>
							<h3 className={styles.successfullyComFlexH3}>Стоимость</h3>
							<h4 className={styles.successfullyComFlexH4}>
								<span className={styles.successfullyComFlexSpanMinus}>
									10 000
								</span>{' '}
								<span
									style={{
										color: '#ff6200'
									}}
								>
									7 000 тг.
								</span>
								<span className={styles.successfullyComFlexSpanSale}>-30%</span>
							</h4>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default CanceledCom
