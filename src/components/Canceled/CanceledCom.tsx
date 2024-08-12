import Image from 'next/image'
import React from 'react'
import vector from '../svg/Vector (1).svg'
import styles from './CanceledCom.module.scss'

const CanceledCom: React.FC = () => {
	return (
		<div>
			<section id={styles.successfullyCom}>
				<div className='container'>
					<div className={styles.successfullyCom}>
						<Image
							style={{
								margin: '30px 0 20px 0',
								width: '60',
								height: '60'
							}}
							src={vector}
							alt=''
							unoptimized={true}
						/>

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
