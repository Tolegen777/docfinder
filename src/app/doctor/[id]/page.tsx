'use client'
import DoctorInformation from '@/components/DoctorInformation/DoctorInformation'
import DoctorModal from '@/components/DoctorModal/DoctorModal'
import Specializations from '@/components/Specializations/Specializations'
import React, { useState } from 'react'

function page() {
	const [modal, setModal] = useState<boolean>(false)

	function modalFunction() {
		if (modal) {
			setModal(false)
		} else {
			setModal(true)
		}
	}
	return (
		<div>
			<div
				style={{
					background: 'white',
					width: '100%'
				}}
			>
				<div>
					<DoctorInformation modalFunction={modalFunction} />
				</div>
				<Specializations />
			</div>
			<div
				style={{
					display: modal ? 'block' : 'none'
				}}
			>
				<DoctorModal setModal={modalFunction} />
			</div>
		</div>
	)
}

export default page
