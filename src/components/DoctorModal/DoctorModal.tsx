import React, { useState } from 'react'
import styles from './DoctorModal.module.scss'

interface DoctorModalProps {
	img: string
	name: string
	description: string
	setModal: () => void
}

const DoctorModal: React.FC<DoctorModalProps> = ({ setModal }) => {
	const [patientName, setPatientName] = useState('')
	const [phone, setPhone] = useState('')

	const handleBooking = () => {
		alert(`Запись успешно отправлена. Имя: ${patientName}, Телефон: ${phone}`)
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<button className={styles.closeButton} onClick={setModal}>
					×
				</button>
				<div className={styles.DoctorModalImg}>
					<img
						style={{
							width: '100px',
							height: '100px',
							borderRadius: '50%'
						}}
						src='https://s3-alpha-sig.figma.com/img/71c5/f5cf/fcf47990608a7c3d3922eeee844bd872?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZoT6yrjy~zJ5jgyIN0IPrfnMwYPUDZfwuH~p-kGoQnbhpWoq0FM6Zjp10hCRsKRCKT06KnPCrj-jHobyYBvytew9cQM-NV9ZyTAuT6IzzNTjl1g8BcvQCf-XF3u15xqE8CrkgM46lSjIddivx8~wWpbUHOGBilCreqajyaNC6IKy10cA7LXfBzDSOiOhR~Sc3z~~HAbbxnvCx4DeASuLefEVxZOGdiCGU-mcRpNcDTI1mI6erlE3kJCBua4540fW9B~bPmeKGXwrAxSH-sJZrw6mqGPgq2tfzYYAUcROpml1H4Hk1lmWGUKbIf6lCDrXMlYmhjJ2DVTGUhp5yUpmFw__'
						alt='kajsdn'
						className={styles.doctorImage}
					/>
					<div className={styles.DoctorModalText}>
						<h3 className={styles.doctorName}>
							Уралбаев Данияр Оразбекович <br />
							<span>Уролог</span>
						</h3>
						<p className={styles.doctorDescription}>
							Улица Розыбакиева, 37в Тастак-3 м-н, Алмалинский район, Алматы
						</p>
					</div>
				</div>

				<div className={styles.doctorMi}>
					<div>
						<input type='checkbox' name='' id='' />
						<h3>Взрослые пациенты</h3>
					</div>
					<div>
						<input type='radio' />
						<h3>Дети</h3>
					</div>
				</div>
				<h4 className={styles.successfullyComFlexH4}>
					Прием
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
				<div className={styles.doctorDivTo}>
					<h4>Специальность/процедура</h4>
					<h5>Уролог</h5>
				</div>
				<div className={styles.doctorDivTo}>
					<h4>Специальность/процедура</h4>
					<h5>10 мая 2024, 11:30</h5>
				</div>
				<input
					type='text'
					placeholder='Ваше имя'
					value={patientName}
					onChange={e => setPatientName(e.target.value)}
					className={styles.input}
				/>
				<input
					type='text'
					placeholder='Ваш телефон'
					value={phone}
					onChange={e => setPhone(e.target.value)}
					className={styles.input}
				/>
				<h5 className={styles.doctorH5In}>
					На указанный вами номер будет отправлено SMS с кодом подтверждения
				</h5>

				<hr />
				<button className={styles.bookButton} onClick={handleBooking}>
					Записаться
				</button>

				<p className={styles.bookP}>
					Нажимая Записаться, я принимаю{' '}
					<span className={styles.bookPSpan}>
						условия пользовательского соглашения, положения о защите
						персональных данных и даю свое согласие на обработку персональных
						данных.
					</span>
				</p>
			</div>
		</div>
	)
}

export default DoctorModal
