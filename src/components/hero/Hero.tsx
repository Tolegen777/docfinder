'use client'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Hero.module.scss'

function Hero() {
	return (
		<div>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={0}
				slidesPerView={1}
				navigation
				onSlideChange={() => console.log('slide change')}
			>
				<SwiperSlide>
					{' '}
					<section id={styles.hero}>
						<div className='container'>
							<div className={styles.hero}>
								<div className={styles.heroText}>
									<h2 className={styles.heroTexth2}>
										Врачи которым вы доверяете
									</h2>
									<h4 className={styles.heroTexth4}>Средний стаж от 7 лет</h4>
									<p className={styles.heroTextP}>
										Наша команда – это высококвалифицированные специалисты с
										проверенным опытом. Мы гордимся тем, что наши врачи имеют
										средний стаж работы более 7 лет, что гарантирует вам лучшее
										медицинское обслуживание.
									</p>
									<div className={styles.heroTextInput}>
										<input
											className={styles.heroTextInputMain}
											type='text'
											placeholder='Врачи, Услуги, Клиники'
										/>
										<button className={styles.heroTextButton}>Найти</button>
									</div>
								</div>
								<div className={styles.heroImgs}>
									<img
										className={styles.heroImg}
										src='https://s3-alpha-sig.figma.com/img/e1cd/5cc4/a83bcfbfa93ea89b4a00a7e8f31faa86?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Umg28d-Aodjez3L84iiik-ssX-grqkeclkIbzLHvaHbxImPZC7X0XEdRIHQmX3ffMkW8RX0fLasYT7n03EfvgmBQutnSau1GQCW9ZsLdysi1mwUPpL59ytV62CdjaFlyr47RWohqTgmnbVAX13UrLdMW5OoKlPJu4KvH1oH9IXzcmVCdy0nWcUzXrzhIjfa-2AgZG7Qy8vN-rpWZfX5cuycMd~hetlDi91JsIc7RCL3A~kdWj7RMMTsSgQOWI4ceIopvfx3xa6K6bfC17Ax6ixiq0fQEDTMvvmuqpq0Y4WOQwMqSI~9ZZPBaeJlpKaYCtBX5FkWkkDh7wCxPb6hmAA__'
										alt=''
									/>
								</div>
							</div>
						</div>
					</section>
				</SwiperSlide>
				<SwiperSlide>
					{' '}
					<section id={styles.hero}>
						<div className='container'>
							<div className={styles.hero}>
								<div className={styles.heroText}>
									<h2 className={styles.heroTexth2}>
										Врачи которым вы доверяете
									</h2>
									<h4 className={styles.heroTexth4}>Средний стаж от 7 лет</h4>
									<p className={styles.heroTextP}>
										Наша команда – это высококвалифицированные специалисты с
										проверенным опытом. Мы гордимся тем, что наши врачи имеют
										средний стаж работы более 7 лет, что гарантирует вам лучшее
										медицинское обслуживание.
									</p>
									<div className={styles.heroTextInput}>
										<input
											className={styles.heroTextInputMain}
											type='text'
											placeholder='Врачи, Услуги, Клиники'
										/>
										<button className={styles.heroTextButton}>Найти</button>
									</div>
								</div>
								<div className={styles.heroImgs}>
									<img
										className={styles.heroImg}
										src='https://s3-alpha-sig.figma.com/img/e1cd/5cc4/a83bcfbfa93ea89b4a00a7e8f31faa86?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Umg28d-Aodjez3L84iiik-ssX-grqkeclkIbzLHvaHbxImPZC7X0XEdRIHQmX3ffMkW8RX0fLasYT7n03EfvgmBQutnSau1GQCW9ZsLdysi1mwUPpL59ytV62CdjaFlyr47RWohqTgmnbVAX13UrLdMW5OoKlPJu4KvH1oH9IXzcmVCdy0nWcUzXrzhIjfa-2AgZG7Qy8vN-rpWZfX5cuycMd~hetlDi91JsIc7RCL3A~kdWj7RMMTsSgQOWI4ceIopvfx3xa6K6bfC17Ax6ixiq0fQEDTMvvmuqpq0Y4WOQwMqSI~9ZZPBaeJlpKaYCtBX5FkWkkDh7wCxPb6hmAA__'
										alt=''
									/>
								</div>
							</div>
						</div>
					</section>
				</SwiperSlide>
				<SwiperSlide>
					{' '}
					<section id={styles.hero}>
						<div className='container'>
							<div className={styles.hero}>
								<div className={styles.heroText}>
									<h2 className={styles.heroTexth2}>
										Врачи которым вы доверяете
									</h2>
									<h4 className={styles.heroTexth4}>Средний стаж от 7 лет</h4>
									<p className={styles.heroTextP}>
										Наша команда – это высококвалифицированные специалисты с
										проверенным опытом. Мы гордимся тем, что наши врачи имеют
										средний стаж работы более 7 лет, что гарантирует вам лучшее
										медицинское обслуживание.
									</p>
									<div className={styles.heroTextInput}>
										<input
											className={styles.heroTextInputMain}
											type='text'
											placeholder='Врачи, Услуги, Клиники'
										/>
										<button className={styles.heroTextButton}>Найти</button>
									</div>
								</div>
								<div className={styles.heroImgs}>
									<img
										className={styles.heroImg}
										src='https://s3-alpha-sig.figma.com/img/e1cd/5cc4/a83bcfbfa93ea89b4a00a7e8f31faa86?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Umg28d-Aodjez3L84iiik-ssX-grqkeclkIbzLHvaHbxImPZC7X0XEdRIHQmX3ffMkW8RX0fLasYT7n03EfvgmBQutnSau1GQCW9ZsLdysi1mwUPpL59ytV62CdjaFlyr47RWohqTgmnbVAX13UrLdMW5OoKlPJu4KvH1oH9IXzcmVCdy0nWcUzXrzhIjfa-2AgZG7Qy8vN-rpWZfX5cuycMd~hetlDi91JsIc7RCL3A~kdWj7RMMTsSgQOWI4ceIopvfx3xa6K6bfC17Ax6ixiq0fQEDTMvvmuqpq0Y4WOQwMqSI~9ZZPBaeJlpKaYCtBX5FkWkkDh7wCxPb6hmAA__'
										alt=''
									/>
								</div>
							</div>
						</div>
					</section>
				</SwiperSlide>
				<SwiperSlide>
					{' '}
					<section id={styles.hero}>
						<div className='container'>
							<div className={styles.hero}>
								<div className={styles.heroText}>
									<h2 className={styles.heroTexth2}>
										Врачи которым вы доверяете
									</h2>
									<h4 className={styles.heroTexth4}>Средний стаж от 7 лет</h4>
									<p className={styles.heroTextP}>
										Наша команда – это высококвалифицированные специалисты с
										проверенным опытом. Мы гордимся тем, что наши врачи имеют
										средний стаж работы более 7 лет, что гарантирует вам лучшее
										медицинское обслуживание.
									</p>
									<div className={styles.heroTextInput}>
										<input
											className={styles.heroTextInputMain}
											type='text'
											placeholder='Врачи, Услуги, Клиники'
										/>
										<button className={styles.heroTextButton}>Найти</button>
									</div>
								</div>
								<div className={styles.heroImgs}>
									<img
										className={styles.heroImg}
										src='https://s3-alpha-sig.figma.com/img/e1cd/5cc4/a83bcfbfa93ea89b4a00a7e8f31faa86?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Umg28d-Aodjez3L84iiik-ssX-grqkeclkIbzLHvaHbxImPZC7X0XEdRIHQmX3ffMkW8RX0fLasYT7n03EfvgmBQutnSau1GQCW9ZsLdysi1mwUPpL59ytV62CdjaFlyr47RWohqTgmnbVAX13UrLdMW5OoKlPJu4KvH1oH9IXzcmVCdy0nWcUzXrzhIjfa-2AgZG7Qy8vN-rpWZfX5cuycMd~hetlDi91JsIc7RCL3A~kdWj7RMMTsSgQOWI4ceIopvfx3xa6K6bfC17Ax6ixiq0fQEDTMvvmuqpq0Y4WOQwMqSI~9ZZPBaeJlpKaYCtBX5FkWkkDh7wCxPb6hmAA__'
										alt=''
									/>
								</div>
							</div>
						</div>
					</section>
				</SwiperSlide>

			</Swiper>
		</div>
	)
}

export default Hero
