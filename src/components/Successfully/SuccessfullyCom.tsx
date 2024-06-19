import Image from 'next/image'
import React from 'react'
import vector from '../svg/Vector.svg'
import styles from './SuccessfullyCom.module.scss'

const SuccessfullyCom: React.FC = () => {
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
						/>

						<h3 className={styles.successfullyComH3}>
							Вы успешно записались на прием
						</h3>
						<h4 className={styles.successfullyComH4}>
							Подтверждение по телефону не требуется
						</h4>
						<p className={styles.successfullyComP}>
							Врач принимает пациентов по живой очереди. Однако некоторые
							пациенты заранее записались на прием через наш сервис, так же как
							и вы. Чтобы избежать пересечения с другими записанными пациентами
							и сократить время ожидания, рекомендуем приходить в назначенное
							время.
						</p>
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
								7 000 тг.
								<span className={styles.successfullyComFlexSpanSale}>-30%</span>
							</h4>
						</div>
						<div className={styles.successfullyComFlex}>
							<button className={styles.successfullyComFlexButton1}>
								Отменить запись
							</button>
							<button className={styles.successfullyComFlexButton2}>
								Написать отзыв
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default SuccessfullyCom
