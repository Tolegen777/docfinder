import Image from 'next/image'
import img from '../svg/Mask group.png'
import styles from './Quality.module.scss'

const Quality = () => {
	return (
		<div>
			<section id={styles.quality}>
				<div className='container'>
					<div className={styles.quality}>
						<div className={styles.qualityText}>
							<h3 className={styles.qualityH3}>Гарантируем качество приёма</h3>
							<p className={styles.qualityP}>
								Если вам не понравился прием, то мы запишем вас к другому врачу
								бесплатно.
							</p>
							<button className={styles.button}>Подробнее</button>
						</div>
						<Image className={styles.img} src={img} alt='img forl' />
					</div>
				</div>
			</section>
		</div>
	)
}

export default Quality
