import React from 'react'
import styles from './SuccessfullyCom.module.scss'

const SuccessfullyCom: React.FC = () => {
	return (
		<div>
			<section id={styles.successfullyCom}>
				<div className='container'>
					<div className={styles.successfullyCom}>
						<svg
							width='54'
							height='60'
							viewBox='0 0 64 70'
							style={{
								margin: '30px 0 20px 0'
							}}
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M4.57143 60.9297H59.4286C61.9429 60.9297 64 62.9705 64 65.4649C64 67.9592 61.9429 70 59.4286 70H4.57143C2.05714 70 0 67.9592 0 65.4649C0 62.9705 2.05714 60.9297 4.57143 60.9297ZM27.4743 42.3356C23.9086 45.8277 18.1486 45.8277 14.5829 42.2903L4.57143 32.3583C2.05714 29.8639 2.10286 25.8277 4.70857 23.424C7.17714 21.0658 11.1086 21.1565 13.4857 23.5147L21.0286 30.9977L50.4229 1.83673C52.8914 -0.612245 56.8686 -0.612245 59.3371 1.83673L59.52 2.01814C61.9886 4.46712 61.9886 8.45805 59.4743 10.907L27.4743 42.3356Z'
								fill='#FF6200'
							/>
						</svg>

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
