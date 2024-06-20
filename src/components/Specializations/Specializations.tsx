'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './Specializations.module.scss'
import StarRating from './StarRating'

const Specializations: React.FC = () => {
	const spec = [
		'Андрология',
		'Гастроэнтерология',
		'Гинекология',
		'Дерматология',
		'Косметология',
		'ЛОР (отоларингология)',
		'Проктология',
		'Урология',
		'Физиотерапия',
		'Флебология',
		'Анализы',
		'Общие процедуры',
		'Акушерство',
		'Обследования и диагностики'
	]

	const services = [
		'Консультация',
		'"Пневмомассаж барабанной перепонки"',
		'"Плазмолифтинг голеностопного сустава"',
		'"Экскреторная урография"',
		'"Инстилляция мочевого пузыря"',
		'"Пункция коленного сустава"',
		'"Удаление инородного тела из мягких тканей"',
		'"Рентген органов грудной клетки"'
	]

	const reviewArray = [
		{
			img: 'https://s3-alpha-sig.figma.com/img/f287/6540/179b8a4e000aba61a9f2f5e0c27527f8?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRQ-cBHcZYO5IJXJ-f3OF4BBOeqPT1qxEhHE~441yOjSd98AYqAGkW3wd8x19mNvq5iO5-VuR2utGuiEsSNA2rR99VPpailZ0a5hg6jmQq6cs3mFDU-Axlm2PJdOs~jLy1owaCduiYeN65Q0OlfEFVdkJiVrirxMKbdI86Bz3pf~-7F2xC8PT0ud~Zkddo2zIB5HY0yPhgxTrVulstDnN-fapYxEGtHbiTZO2JqSTz-JtTscmyPdcyWE7T7fCmFCn6C6iI3PKXY30dStXn7jLLCFQHDvxnayRAcfJVVMe18LB4TqyJIEk8isUy3rEPxEe91GjrcCLBfya~3rgGZE4A__',
			name: 'Чингис Чингисович ',
			decr: 'Уралбаев Данияр Оразбекович - безусловно, один из лучших специалистов в области урологии. Я обратился к нему со сложным случаем, и был поражен его глубокими знаниями, профессионализмом и вниманием к деталям. Его опыт работы в течение пяти лет проявляется в каждом аспекте его работы: от диагностики до лечения...',
			reiting: 3
		},
		{
			img: 'https://s3-alpha-sig.figma.com/img/f287/6540/179b8a4e000aba61a9f2f5e0c27527f8?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XRQ-cBHcZYO5IJXJ-f3OF4BBOeqPT1qxEhHE~441yOjSd98AYqAGkW3wd8x19mNvq5iO5-VuR2utGuiEsSNA2rR99VPpailZ0a5hg6jmQq6cs3mFDU-Axlm2PJdOs~jLy1owaCduiYeN65Q0OlfEFVdkJiVrirxMKbdI86Bz3pf~-7F2xC8PT0ud~Zkddo2zIB5HY0yPhgxTrVulstDnN-fapYxEGtHbiTZO2JqSTz-JtTscmyPdcyWE7T7fCmFCn6C6iI3PKXY30dStXn7jLLCFQHDvxnayRAcfJVVMe18LB4TqyJIEk8isUy3rEPxEe91GjrcCLBfya~3rgGZE4A__',
			name: 'Чингис Чингисович ',
			decr: 'Уралбаев Данияр Оразбекович - безусловно, один из лучших специалистов в области урологии. Я обратился к нему со сложным случаем, и был поражен его глубокими знаниями, профессионализмом и вниманием к деталям. Его опыт работы в течение пяти лет проявляется в каждом аспекте его работы: от диагностики до лечения...',
			reiting: 4
		}
	]

	const [expandedReviews, setExpandedReviews] = useState<{
		[key: number]: boolean
	}>({})

	const toggleReadMore = (index: number) => {
		setExpandedReviews(prevState => ({
			...prevState,
			[index]: !prevState[index]
		}))
	}

	const truncateText = (text: string, limit: number) => {
		const words = text.split(' ')
		if (words.length > limit) {
			return words.slice(0, limit).join(' ') + '...'
		}
		return text
	}

	return (
		<section id={styles.specializations}>
			<div className='container'>
				<div className={styles.specializations}>
					<div className={styles.specialMain}>
						<h4 className={styles.specialMainH4}>Специализации</h4>
						<div className={styles.special}>
							{spec.map((el, key) => (
								<h3 className={styles.specialH3} key={key}>
									{el}
								</h3>
							))}
						</div>
					</div>

					<div className={styles.servicesMain}>
						<h4 className={styles.servicesMainH4}>Услуги</h4>
						<div className={styles.services}>
							{services.map((el, key) => (
								<h3 className={styles.servicesH3} key={key}>
									{el}
								</h3>
							))}
						</div>
					</div>
					<div className='information'>
						<h4 className={styles.servicesMainH4}>Информация о враче</h4>
						<p className={styles.servicesDescrP}>
							Врач высшей квалификационной категории Индира Нуржановна имеет
							большой опыт в диагностике и выставлении диагноза пациентам с
							различными заболеваниями. Доктор постоянно повышает уровень своих
							знаний за границей. Большой практический опыт и уникальные знания,
							полученные в лучших медицинских базах мира, дают возможность
							правильно диагностировать и поставить точный диагноз
						</p>
					</div>

					<div className={styles.reviewReiting}>
						<h4 className={styles.reviewReitingH4}>
							Отзовы:{' '}
							<span className={styles.reviewReitingSpan}>
								{reviewArray.length}
							</span>
						</h4>
					</div>
					<div className={styles.reviewYou}>
						<h4 className={styles.reviewYouH4}>Ваш отзыв:</h4>
						<textarea className={styles.reviewYouText}></textarea>
						<div className={styles.reviewYouDiv}>
							<button className={styles.reviewYouButton}> Отправить</button>
						</div>
					</div>
					<div className={styles.reviewArray}>
						{reviewArray.map((el, key) => (
							<div className={styles.reviewArrayDev} key={key}>
								<Image
									width={100}
									height={100}
									className={styles.reviewArrayImg}
									src={el.img}
									alt=''
								/>
								<div className={styles.reviewArrayText}>
									<h3 className={styles.reviewArrayH3}>{el.name}</h3>
									<p className={styles.reviewArrayP}>
										{expandedReviews[key] ? el.decr : truncateText(el.decr, 30)}
									</p>
									<div className={styles.reviewYouDiv}>
										<button
											onClick={() => toggleReadMore(key)}
											className={styles.readMoreButton}
										>
											{expandedReviews[key] ? 'Скрыть' : 'Читать дальше'}
										</button>
									</div>
								</div>
								<StarRating rating={el.reiting} />{' '}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Specializations
