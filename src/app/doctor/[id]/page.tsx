'use client'
import DoctorInformation from '@/components/DoctorInformation/DoctorInformation'
import DoctorModal from '@/components/DoctorModal/DoctorModal'
import Specializations from '@/components/Specializations/Specializations'
import React, { useState } from 'react'

function Page() { 
	const [modal, setModal] = useState<boolean>(false)

	function toggleModal() {  
		setModal(prevModal => !prevModal);  
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
					<DoctorInformation modalFunction={toggleModal} />
				</div>
				<Specializations />
			</div>
			<div
				style={{
					display: modal ? 'block' : 'none'
				}}
			>
				<DoctorModal setModal={toggleModal} />
			</div>
		</div>
	)
}

export default Page; // Export with uppercase name
