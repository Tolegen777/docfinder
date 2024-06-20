"use client"
import React, { useState } from 'react'
import styles from './HeaderModal.module.scss'

type DoctorModalProps = {
	setModal: () => void
}

const HeaderModal = ({ setModal }: DoctorModalProps) => {
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
				<h4>Modal Title</h4>
				<h2 className={styles.doctorName}>Войти в профиль пользователя</h2>
				<input
					type='text'
					className={styles.input}
					placeholder='Ваш телефон'
					value={phone}
					onChange={e => setPhone(e.target.value)}
				/>
				<h6 className={styles.doctorP}>
					На указанный вами номер будет отправлено SMS с кодом подтверждения
				</h6>
				<button className={styles.closeButton1}>Войти по DocFinderID</button>
				<button className={styles.closeButton2}>Войти через EgovKz</button>
				<button className={styles.bookButton} onClick={handleBooking}>
					Войти
				</button>
			</div>
		</div>
	)
}

export default HeaderModal
