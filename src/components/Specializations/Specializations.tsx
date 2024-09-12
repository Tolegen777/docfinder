'use client'
import Image from 'next/image'
import React, {useMemo, useState} from 'react'
import styles from './Specializations.module.scss'
import StarRating from './StarRating'
import {ISpecDoctorById} from "@/types/specDoctorById";

import docImg from '../../public/icons/doctor.svg'
import SpecializationAndServices from "@/components/SpecializationAndServices/SpecializationAndServices";
import DoctorFullDescription from "@/components/Specializations/DoctorFullDescription";
import VisitList from "@/components/VisitList/VisitList";
import {useQuery} from "@tanstack/react-query";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {IVisit} from "@/components/Profile/PatientVisits/PatientVisits";
import {useStateContext} from "@/contexts";

type Props = {
	data: ISpecDoctorById | undefined
}

const Specializations = ({data}: Props) => {

	const {state} = useStateContext()

	const { data: visits, isLoading } = useQuery({
		queryKey: ["patientVisits"],
		queryFn: () =>
			axiosInstanceWithTokenLogic
				.get<IVisit[]>(`patients/doctor-detail-view/${data?.doctor_profile_id}/my-visits/`)
				.then((response) => response.data),
		enabled: state?.authUser
	});

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
					<SpecializationAndServices
						specialitiesAndProcedures={data?.specialities_and_procedures ?? []}
						doctorProcsData={data?.list_of_procedures ?? []}
						doctorProcFullData={data?.doctor_procedures_data ?? []}
						doctorData={data}
					/>
					<div className='information'>
						<h4 className={styles.servicesMainH4}>Информация о враче</h4>
						{
							data?.doctor_full_description ?
								<DoctorFullDescription doctorFullDescription={data?.doctor_full_description}/> :
								<p className={styles.servicesDescrP}>
									<div dangerouslySetInnerHTML={{__html: data?.doctor_description ?? ''}}/>
								</p>
						}
					</div>

					{visits && visits?.length > 0 && <div className='information'>
						<h4 className={styles.servicesMainH4}>Мои посещения</h4>
						<VisitList
							doctorId={data?.doctor_profile_id ?? null}
							visits={visits ?? []}
							isLoading={isLoading}
						/>
					</div>}

					<div className={styles.reviewReiting}>
						<h4 className={styles.reviewReitingH4}>
							Отзывы:{' '}
							<span className={styles.reviewReitingSpan}>
								{data?.reviews_count}
							</span>
						</h4>
					</div>
					{/*// FIXME закоментил так как пока нет апишки*/}
					{/*<div className={styles.reviewYou}>*/}
					{/*	<h4 className={styles.reviewYouH4}>Ваш отзыв:</h4>*/}
					{/*	<textarea className={styles.reviewYouText}></textarea>*/}
					{/*	<div className={styles.reviewYouDiv}>*/}
					{/*		<button className={styles.reviewYouButton}> Отправить</button>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<div className={styles.reviewArray}>
						{data?.reviews?.map((el, key) => (
							<div className={styles.reviewArrayDev} key={key}>
								<Image
									width={100}
									height={100}
									className={styles.reviewArrayImg}
									src={docImg}
									alt=''
								/>
								<div className={styles.reviewArrayText}>
									<h3 className={styles.reviewArrayH3}>
										{el.reviews__author__last_name} {' '}
										{el.reviews__author__first_name}
									</h3>
									<p className={styles.reviewArrayP}>
										{expandedReviews[key] ? el.reviews__text : truncateText(el.reviews__text, 30)}
									</p>
									{el?.reviews__text?.length > 30 && <div className={styles.reviewYouDiv}>
										<button
											onClick={() => toggleReadMore(key)}
											className={styles.readMoreButton}
										>
											{expandedReviews[key] ? 'Скрыть' : 'Читать дальше'}
										</button>
									</div>}
								</div>
								<StarRating rating={el.reviews__rating}/>{' '}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Specializations
